<template>
  <div class="bootstrap-container">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h5>
          Select Location
          <span class="coordinates-display">
            (Lat: {{ defaultLat.toFixed(6) }}, Lng: {{ defaultLng.toFixed(6) }})
          </span>
        </h5>
      </div>
      <div class="card-body p-0">
        <div id="map" ref="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

const DEFAULT_LATITUDE = 50.049683;
const DEFAULT_LONGITUDE = 19.944544;
const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default {
  name: "MapSelector",
  props: {
    defaultLat: {
      type: Number,
      default: DEFAULT_LATITUDE,
    },
    defaultLng: {
      type: Number,
      default: DEFAULT_LONGITUDE,
    },
  },
  data() {
    return {
      map: null,
      marker: null,
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      this.map = L.map(this.$refs.map).setView(
        [this.defaultLat, this.defaultLng],
        13
      );

      L.tileLayer(TILE_LAYER_URL, {
        attribution: ATTRIBUTION,
      }).addTo(this.map);

      this.marker = L.marker([this.defaultLat, this.defaultLng], {
        draggable: true,
      }).addTo(this.map);

      this.marker.on("dragend", this.updateCoordinates);

      this.map.on("click", this.handleMapClick);
    },
    updateCoordinates() {
      const { lat, lng } = this.marker.getLatLng();
      this.$emit("update-coordinates", { latitude: lat, longitude: lng });
    },
    handleMapClick(event) {
      const { lat, lng } = event.latlng;
      this.marker.setLatLng([lat, lng]);
      this.updateCoordinates();
    },
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}

.coordinates-display {
  font-size: 0.9rem;
  margin-left: 10px;
  color: #fdfdfd;
}
</style>
