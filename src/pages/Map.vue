<template>
  <q-page>
    <div class="q-pa-lg">
      <div>{{ mapCenter }}</div>
      <div id="map" class="map-container"></div>
    </div>
  </q-page>
</template>

<script>
// openlayers
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";

export default {
  name: "Map",
  data() {
    return {
      mapCenter: [25.073697, 58.706599]
    };
  },
  mounted() {
    this.createMap();
  },
  methods: {
    // create map object
    createMap() {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat(this.mapCenter),
          zoom: 7
        })
      });
      // this.mapCenter = toLonLat(map.getView().getCenter());
    }
  },
  computed: {}
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
