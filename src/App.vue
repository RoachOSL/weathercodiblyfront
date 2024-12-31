<template>
  <div id="app">
    <div v-if="loading" class="spinner-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="spinner-text">Fetching weather data, please wait...</p>
    </div>

    <div v-else class="container">
      <div class="row">
        <div class="col-12 col-lg-6 d-flex mb-3">
          <LeafletMap
            :defaultLat="latitude"
            :defaultLng="longitude"
            @update-coordinates="updateCoordinates"
            class="flex-fill"
          />
        </div>

        <div class="col-12 col-lg-6 d-flex mb-3">
          <WeatherForecastTable
            :forecastData="forecastData"
            class="flex-fill"
          />
        </div>
      </div>

      <FooterSummary
        :lowestTemp="summaryData.lowestTemperatureCelsius"
        :highestTemp="summaryData.highestTemperatureCelsius"
        :avgPressure="summaryData.avgPressureHPa"
        :avgSunExposure="avgSunExposureHours"
        :summary="summaryData.forecastSummary"
      />
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import FooterSummary from "./components/FooterSummary.vue";
import WeatherForecastTable from "./components/ForecastTable.vue";
import LeafletMap from "./components/LeafletMap.vue";
import {
  fetchWeatherSummary,
  fetchWeatherForecast,
} from "./services/weatherService.js";

export default {
  name: "App",
  components: {
    FooterSummary,
    WeatherForecastTable,
    LeafletMap,
  },
  data() {
    return {
      summaryData: {},
      forecastData: [],
      avgSunExposureHours: 0,
      loading: true,
      latitude: null,
      longitude: null,
      errorMessage: "",
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.latitude = latitude;
            this.longitude = longitude;
            this.loadWeatherData(latitude, longitude);
          },
          () => {
            this.handleDefaultLocation(
              "Unable to fetch your location. Using default coordinates (Kraków)."
            );
          }
        );
      } else {
        this.handleDefaultLocation(
          "Geolocation is not supported by your browser. Using default coordinates (Kraków)."
        );
      }
    },
    handleDefaultLocation(message) {
      console.error(message);
      this.errorMessage = message;
      this.latitude = 50.049683;
      this.longitude = 19.944544;
      this.loadWeatherData(this.latitude, this.longitude);
    },
    async loadWeatherData(latitude, longitude) {
      try {
        const [summary, forecast] = await Promise.all([
          fetchWeatherSummary(latitude, longitude),
          fetchWeatherForecast(latitude, longitude),
        ]);
        this.summaryData = summary;
        this.forecastData = forecast;
        this.avgSunExposureHours = (
          summary.avgSunshineDurationSeconds / 3600
        ).toFixed(2);
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
        this.errorMessage =
          "There was an error fetching the weather data. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    updateCoordinates({ latitude, longitude }) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.loadWeatherData(latitude, longitude);
    },
  },
};
</script>

<style>
:root {
  --background-gradient: linear-gradient(135deg, #87cefa, #6ec6e9);
  --text-color: #555;
  --error-color: red;
}

#app {
  background: var(--background-gradient);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.spinner-text {
  margin-top: 10px;
  font-size: 1.2rem;
  color: var(--text-color);
}

.container {
  margin-top: 20px;
}

.error-message {
  color: var(--error-color);
  text-align: center;
  margin-top: 10px;
}
</style>
