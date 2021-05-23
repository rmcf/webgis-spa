<template>
  <q-page>
    <!-- map and info container -->
    <div class="q-pa-lg map-flex-container">
      <!-- map info -->
      <div class="map-info">
        <div v-if="infoClick" class="text-center">Please click on the map</div>
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
                <q-select v-model="level" :options="levels" label="Level" />
              </div>
            </q-card-section>
            <q-card-actions vertical align="right">
              <q-btn
                v-if="onClickCoordinatesComp"
                v-on:click="
                  getHexagon(
                    onClickCoordinatesComp[0],
                    onClickCoordinatesComp[1],
                    level
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
        <div v-if="hexagon">
          <q-card class="my-card card-margins">
            <q-card-section>
              <div class="text-subtitle1 text-weight-medium">
                Selected hexagon:
              </div>
              <div>{{ hexagon }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical align="right">
              <q-btn
                v-if="onClickCoordinatesComp"
                v-on:click="convertH3toFeature(hexagon)"
                flat
                color="primary"
                label="hexagon to feature"
              />
            </q-card-actions>
          </q-card>
        </div>

        <!-- feature -->
        <div v-if="feature">
          <q-card class="my-card card-margins">
            <q-card-section class="feature-json">
              <div class="text-subtitle1 text-weight-medium">
                Selected feature:
              </div>
              <div>{{ feature }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions vertical align="right">
              <q-btn
                v-if="onClickCoordinatesComp"
                v-on:click="renderHexagon(feature)"
                flat
                color="primary"
                label="feature to map"
              />
            </q-card-actions>
          </q-card>
        </div>
        <div>
          <!-- update map -->
          <!-- <q-btn
            v-on:click="updateMap"
            color="primary"
            label="Update"
            class="q-ma-sm"
          /> -->
        </div>
        <!-- zoom input -->
        <!-- <div>
          <q-input
            v-model="mapZoom"
            v-on:change="updateMap()"
            label="Map zoom"
          />
        </div> -->
        <!-- info section -->
        <!-- <div>Map Center: {{ mapCenter }}</div>
        <hr />
        <div>Map Zoom: {{ mapZoom }}</div>
        <hr />
        <div>Map Zoom Computed: {{ zoomComp }}</div>
        <hr />
        <div v-if="centerComp">
          Map Center Computed:<br />
          {{ centerComp[0] }}<br />
          {{ centerComp[1] }}
        </div>
        <hr />
        <div>Area: {{ areaComp }}</div>
        <div>Projection Computed: {{ projComputed }}</div>
        <div>Map width: {{ mapWidth }}</div>
        <hr /> -->
      </div>
      <!-- map container -->
      <div id="openmap" ref="map" class="map-container"></div>
    </div>
  </q-page>
</template>

<script>
// openlayers
import "ol/ol.css";
import { geoToH3 } from "h3-js";
import geojson2h3 from "geojson2h3";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { getArea } from "ol/extent";
import { fromLonLat, toLonLat } from "ol/proj";

// Vue.use(h3ToGeo);

export default {
  name: "Map",
  data() {
    return {
      map: null,
      mapCenter: [25.073697, 58.706599],
      mapZoom: 7,
      clickCoordinates: null,
      levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      level: 7,
      hexagon: null,
      feature: null
    };
  },
  // watch: {
  //   zoomComp: function() {
  //     console.log("zoom updated");
  //   }
  // },
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
    // click coords
    clickCoordsMethod(coords) {
      this.clickCoordinates = toLonLat(coords);
      this.hexagon = null;
      this.feature = null;
    },
    // get hexagon
    getHexagon(x, y, level) {
      this.hexagon = geoToH3(y, x, level);
    },
    // h3 to feature
    convertH3toFeature(adress) {
      this.feature = geojson2h3.h3ToFeature(adress);
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
        let extentArea = getArea(extent);
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
        this.hexagon === null &&
        this.feature === null
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

@media (min-width: 768px) {
  /* map and info container */
  .map-flex-container {
    display: flex;
    flex-direction: row-reverse;
  }
  /* map info */
  .map-info {
    flex: 0 0 300px;
  }
}
</style>
