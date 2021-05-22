<template>
  <q-page>
    <!-- map and info container -->
    <div class="q-pa-lg map-flex-container">
      <!-- map info -->
      <div class="map-info">
        <div>
          <q-btn v-on:click="updateMap" color="primary" label="Update" />
        </div>
        <!-- zoom input -->
        <div>
          <q-input
            v-model="mapZoom"
            v-on:change="updateMap()"
            label="Map zoom"
          />
        </div>
        <!-- info section -->
        <div>Map Center: {{ mapCenter }}</div>
        <div>Map Zoom: {{ mapZoom }}</div>
        <div>Map Zoom Computed: {{ zoomComp }}</div>
        <div>Map Center Computed: {{ centerComp }}</div>
        <div>Area: {{ areaComp }}</div>
        <div>Projection Computed: {{ projComputed }}</div>
        <div>
          Selected coordinates: {{ clickCoordinates
          }}{{ onClickCoordinatesComp }}
        </div>
      </div>
      <!-- map container -->
      <div id="openmap" ref="map-root" class="map-container"></div>
    </div>
  </q-page>
</template>

<script>
// openlayers
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { getArea } from "ol/extent";
import { fromLonLat, toLonLat } from "ol/proj";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      mapCenter: [25.073697, 58.706599],
      mapZoom: 7,
      clickCoordinates: null
    };
  },
  watch: {
    zoomComp: function() {
      console.log("zoom updated");
    }
  },
  mounted() {
    this.createMap();
  },
  methods: {
    // create map object
    createMap() {
      this.map = new Map({
        target: this.$refs["map-root"],
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
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
      this.clickCoordinates = coords;
    }
    // update map
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
        return center;
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
        var ref = this;
        this.map.on("singleclick", function(evt) {
          ref.clickCoordsMethod(evt.coordinate);
        });
        return null;
      } else return null;
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
