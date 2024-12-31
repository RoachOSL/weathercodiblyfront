<template>
  <div id="app">
    <div v-if="errorMessage" class="error-message-wrapper">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

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
      avgSunExposureHours: "",
      loading: true,
      latitude: 50.049683,
      longitude: 19.944544,
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
              "Unable to fetch your location. Using default coordinates (Cracow)."
            );
          }
        );
      } else {
        this.handleDefaultLocation(
          "Geolocation is not supported by your browser. Using default coordinates (Cracow)."
        );
      }
    },
    handleDefaultLocation(message) {
      console.error(message);
      this.errorMessage = message;

      setTimeout(() => {
        this.errorMessage = "";
        this.loadWeatherData(this.latitude, this.longitude);
      }, 3000);
    },
    async loadWeatherData(latitude, longitude) {
      try {
        const [summary, forecast] = await Promise.all([
          fetchWeatherSummary(latitude, longitude),
          fetchWeatherForecast(latitude, longitude),
        ]);
        this.summaryData = summary;
        this.forecastData = forecast;

        const avgSunshineDurationHours =
          summary.avgSunshineDurationSeconds / 3600;
        const hours = Math.floor(avgSunshineDurationHours);
        const minutes = Math.round((avgSunshineDurationHours - hours) * 60);

        this.avgSunExposureHours = `${hours} hours ${minutes} minutes`;
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
  align-items: center;
  justify-content: center;
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
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
</style>
