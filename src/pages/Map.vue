<template>
  <q-page>
    <!-- map and info container -->
    <div class="q-pa-lg map-flex-container">
      <!-- map info -->
      <div class="map-info">
        <!-- tabs -->
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="define" label="hex define" />
          <q-tab name="calculate" label="hex calculate" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <!-- define HEX panel -->
          <q-tab-panel name="define">
            <div v-if="infoClick">
              <!-- click banner -->
              <q-banner class="bg-grey-3">
                <template v-slot:avatar>
                  <q-icon name="location_on" color="blue-grey-5" />
                </template>
                Please click on the map
              </q-banner>
            </div>
            <!-- clean map button -->
            <div v-if="!infoClick" class="clean-button">
              <q-btn
                v-on:click="cleanMap()"
                color="orange-7"
                icon="clear"
                class="full-width"
                label="Clean map"
                flat
              />
            </div>

            <!-- coordinates -->
            <div v-if="onClickCoordinatesComp">
              <q-card class="my-card card-first-margins">
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    Selected coordinates:
                  </div>
                  <div>X= {{ onClickCoordinatesComp[0] }}</div>
                  <div>Y= {{ onClickCoordinatesComp[1] }}</div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div>
                    <q-select
                      v-model="hexDefineLevel"
                      :options="hexDefineLevels"
                      label="Level"
                    />
                  </div>
                </q-card-section>
                <q-card-actions vertical align="right">
                  <q-btn
                    v-if="onClickCoordinatesComp"
                    v-on:click="
                      getHexagon(
                        onClickCoordinatesComp[0],
                        onClickCoordinatesComp[1],
                        hexDefineLevel
                      )
                    "
                    flat
                    color="primary"
                    label="define hexagon"
                  />
                </q-card-actions>
              </q-card>
            </div>

            <!-- hexagon -->
            <div v-if="hexDefineHexagon">
              <q-card class="my-card card-margins">
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    Selected hexagon:
                  </div>
                  <div>{{ hexDefineHexagon }}</div>
                </q-card-section>
                <q-separator />
                <q-card-actions vertical align="right">
                  <q-btn
                    v-if="onClickCoordinatesComp"
                    v-on:click="convertH3toFeature(hexDefineHexagon)"
                    flat
                    color="primary"
                    label="hexagon to feature"
                  />
                </q-card-actions>
              </q-card>
            </div>

            <!-- feature -->
            <div v-if="hexDefineFeature">
              <q-card class="my-card card-margins">
                <q-card-section class="feature-json">
                  <div class="text-subtitle1 text-weight-medium">
                    Selected feature:
                  </div>
                  <div>{{ hexDefineFeature }}</div>
                </q-card-section>
                <q-separator />
                <q-card-actions vertical align="right">
                  <q-btn
                    v-if="onClickCoordinatesComp"
                    v-on:click="renderHexagon(hexDefineFeature)"
                    flat
                    color="primary"
                    label="feature to map"
                  />
                </q-card-actions>
              </q-card>
            </div>
            <div></div>
          </q-tab-panel>

          <!-- calculate HEX panel -->
          <q-tab-panel name="calculate">
            <!-- clean map button -->
            <div v-if="hexCalculateFeatures.length !== 0" class="clean-button">
              <q-btn
                v-on:click="cleanMap()"
                color="orange-7"
                icon="clear"
                class="full-width"
                label="Clean map"
                flat
              />
            </div>
            <div v-if="hexCalculateFeatures.length === 0">
              <q-select
                v-model="hexCalculateLevel"
                :options="hexCalculateLevels"
                label="Level"
              />
            </div>
            <!-- create hexagons on extent -->
            <div v-if="hexCalculateFeatures.length === 0" class="calc-button">
              <q-btn
                v-on:click="extentToPolygon()"
                color="primary"
                icon="functions"
                class="full-width"
                label="Calculate HEXs"
                flat
              />
            </div>
            <!-- banner with quantity of calculated hexagons -->
            <div v-if="hexCalculateFeatures.length !== 0">
              <q-banner class="bg-grey-3">
                <q-badge
                  color="red"
                  text-color="white"
                  :label="this.hexCalculateHexagons.length"
                />
                hexagons calculated in map view at level
                <q-badge
                  color="orange"
                  text-color="black"
                  :label="this.hexCalculateLevel"
                />
              </q-banner>
            </div>

            <!-- hex list -->
            <div v-if="hexCalculateFeatures.length !== 0" class="hexcalc-list">
              <q-list bordered separator dense class="rounded-borders">
                <q-item
                  v-for="hex in hexCalculateHexagons"
                  :key="hex"
                  clickable
                  v-ripple
                >
                  <q-item-section>{{ hex }}</q-item-section>
                </q-item></q-list
              >
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <!-- map container -->
      <div id="openmap" ref="map" class="map-container"></div>
    </div>
  </q-page>
</template>

<script>
// openlayers
import "ol/ol.css";
import { geoToH3, polyfill, h3SetToMultiPolygon } from "h3-js";
import geojson2h3 from "geojson2h3";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {
  getArea,
  getBottomLeft,
  getBottomRight,
  getTopLeft,
  getTopRight
} from "ol/extent";
import { fromLonLat, toLonLat } from "ol/proj";

// Vue.use(h3ToGeo);

export default {
  name: "Map",
  data() {
    return {
      // map object
      map: null,
      mapCenter: [25.073697, 58.706599],
      mapZoom: 7,
      // coordinates of click
      clickCoordinates: null,
      // tabs map-info
      tab: "define",
      // hex define
      hexDefineLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      hexDefineLevel: 2,
      hexDefineHexagon: null,
      hexDefineFeature: null,
      // hex calculate
      hexCalculateLevels: [1, 2, 3, 4],
      hexCalculateLevel: 3,
      hexCalculateHexagons: [],
      hexCalculateFeatures: []
    };
  },

  mounted() {
    this.createMap();
  },

  methods: {
    // create map object
    createMap() {
      // tile layer
      const tileLayer = new TileLayer({
        source: new OSM()
      });
      // map object
      this.map = new Map({
        target: this.$refs["map"],
        layers: [tileLayer],
        view: new View({
          center: fromLonLat(this.mapCenter),
          zoom: this.mapZoom
        })
      });
    },
    // update map
    updateMap() {
      this.map.getView().setZoom(this.mapZoom);
      this.map.updateSize();
    },
    // clean map
    cleanMap() {
      // remove HTML map container
      document.getElementById("openmap").innerHTML = "";
      this.clickCoordinates = null;
      // hex define clean
      this.hexDefineLevel = 2;
      this.hexDefineHexagon = null;
      this.hexDefineFeature = null;
      // hex calculate clean
      this.hexCalculateLevel = 3;
      this.hexCalculateFeatures = [];
      this.hexCalculateHexagons = [];
      // load empty map
      this.createMap();
    },
    // click coords
    clickCoordsMethod(coords) {
      this.clickCoordinates = toLonLat(coords);
      this.hexDefineHexagon = null;
      this.hexDefineFeature = null;
    },
    // convert to Lon Lat
    convertToLonLat(point) {
      return toLonLat(point);
    },
    // replace Lon with Lat
    replaceLatLong(point) {
      let newCoordinates = [];
      newCoordinates.push(point[1]);
      newCoordinates.push(point[0]);
      return newCoordinates;
    },
    // get hexagon
    getHexagon(x, y, level) {
      this.hexDefineHexagon = geoToH3(y, x, level);
    },
    // h3 to feature
    convertH3toFeature(adress) {
      this.hexDefineFeature = geojson2h3.h3ToFeature(adress);
    },
    // render hexagon
    renderHexagon(feature) {
      const hexagons = new GeoJSON().readFeature(feature, {
        featureProjection: "EPSG:3857"
      });
      // vector layer
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [hexagons]
        })
      });
      this.map.addLayer(vectorLayer);
    },
    // extent to polygon
    extentToPolygon() {
      let corners = [];
      let extent = this.map.getView().calculateExtent();
      let bl = getBottomLeft(extent);
      let tl = getTopLeft(extent);
      let tr = getTopRight(extent);
      let br = getBottomRight(extent);
      corners.push(bl, tl, tr, br, bl);
      let cornersConverted = [];
      corners.forEach(point => {
        let pointConverted = this.convertToLonLat(point);
        let pointReplacedLongLat = this.replaceLatLong(pointConverted);
        cornersConverted.push(pointReplacedLongLat);
      });
      // extent polygon to hexagons
      let hexagons = polyfill(cornersConverted, this.hexCalculateLevel);
      this.hexCalculateHexagons = hexagons;
      hexagons.forEach(hex => {
        let feature = geojson2h3.h3ToFeature(hex);
        let hexagon = new GeoJSON().readFeature(feature, {
          featureProjection: "EPSG:3857"
        });
        this.hexCalculateFeatures.push(hexagon);
      });
      // vector layer
      let vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: this.hexCalculateFeatures
        })
      });
      this.map.addLayer(vectorLayer);
    }
  },

  computed: {
    // zoom computed
    zoomComp: function() {
      if (this.map) {
        let zoom = this.map.getView().getZoom();
        return zoom;
      } else return null;
    },

    // center computed
    centerComp: function() {
      if (this.map) {
        let center = this.map.getView().getCenter();
        return toLonLat(center);
      } else return null;
    },

    // area computed
    areaComp: function() {
      if (this.map) {
        let extent = this.map.getView().calculateExtent();
        let extentArea = getArea(extent) / 1000000;
        return extentArea;
      } else return null;
    },

    // projection computed
    projComputed: function() {
      if (this.map) {
        let proj = this.map.getView().getProjection();
        return proj.code_;
      } else return null;
    },

    // projection computed
    cornersComputed: function() {
      if (this.map) {
        let corners = [];
        let extent = this.map.getView().calculateExtent();
        let bl = getBottomLeft(extent);
        let br = getBottomRight(extent);
        let tl = getTopLeft(extent);
        let tr = getTopRight(extent);
        corners.push(
          this.convertToLonLat(bl),
          this.convertToLonLat(tl),
          this.convertToLonLat(tr),
          this.convertToLonLat(br)
        );
        return corners;
      } else return null;
    },

    // onclick coordinates
    onClickCoordinatesComp: function() {
      if (this.map) {
        var coords = [];
        var ref = this;
        this.map.on("singleclick", function(evt) {
          coords = evt.coordinate;
          ref.clickCoordsMethod(evt.coordinate);
        });
        return this.clickCoordinates;
      } else return null;
    },

    // map resize
    mapWidth: function() {
      if (this.map) {
        let width = document.getElementById("openmap").offsetWidth;
        return width;
      } else return null;
    },

    // info-click on the map
    infoClick: function() {
      if (
        this.clickCoordinates === null &&
        this.hexDefineHexagon === null &&
        this.hexDefineFeature === null
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
/* map container */
.map-container {
  width: 100%;
  height: 600px;
}

/* map info */
.map-info {
  padding: 0px 10px 10px 10px;
}

.feature-json {
  height: 100px;
  width: 250px;
  overflow-y: scroll;
  overflow-x: scroll;
}

.card-margins {
  margin: 20px 5px 0px 5px;
}

.card-first-margins {
  margin: 0px 5px 0px 5px;
}

.clean-button {
  margin: 0px 5px 10px 5px;
}

.calc-button {
  margin: 10px 5px 10px 5px;
}

.q-tab-panel {
  padding: 16px 0px 16px 10px;
}

.hexcalc-list {
  margin-top: 10px;
  max-height: 400px;
  overflow-y: scroll;
}

@media (min-width: 768px) {
  /* map and info container */
  .map-flex-container {
    display: flex;
    flex-direction: row-reverse;
  }
  /* map info */
  .map-info {
    flex: 0 0 300px;
    min-height: 100vh;
  }
}
</style>
