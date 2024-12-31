<template>
  <footer class="weather-footer text-light">
    <div class="container p-4">
      <div class="text-left mb-4">
        <h3 class="footer-title">Weekly Weather Summary</h3>
      </div>

      <div class="row mb-4 align-items-center">
        <div class="col">
          <i class="fas fa-thermometer-half footer-icon"></i>
          <strong>Extreme Temperatures:</strong>
          <span> {{ lowestTemp }}°C to {{ highestTemp }}°C</span>
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <div class="col">
          <i class="fas fa-tachometer-alt footer-icon"></i>
          <strong>Average Pressure:</strong>
          <span> {{ avgPressure }} hPa</span>
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <div class="col">
          <i class="fas fa-sun footer-icon"></i>
          <strong>Average Sun Exposure:</strong>
          <span> {{ avgSunExposure }} hours</span>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col">
          <i class="fas fa-cloud footer-icon"></i>
          <strong>Summary:</strong>
          <span> {{ summary }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
const DEFAULT_LOWEST_TEMP = 0;
const DEFAULT_HIGHEST_TEMP = 0;
const DEFAULT_PRESSURE = 1013;
const DEFAULT_SUN_EXPOSURE = "0";
const DEFAULT_SUMMARY = "No data available";

export default {
  name: "FooterSummary",
  props: {
    lowestTemp: {
      type: Number,
      default: DEFAULT_LOWEST_TEMP,
    },
    highestTemp: {
      type: Number,
      default: DEFAULT_HIGHEST_TEMP,
    },
    avgPressure: {
      type: Number,
      default: DEFAULT_PRESSURE,
    },
    avgSunExposure: {
      type: String,
      default: DEFAULT_SUN_EXPOSURE,
    },
    summary: {
      type: String,
      default: DEFAULT_SUMMARY,
    },
  },
};
</script>

<style scoped>
.weather-footer {
  color: white;
  padding: 30px 0;
  border-top: 2px solid #eaeaea;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  padding: 0;
}

.footer-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #ffffff;
}

.footer-icon {
  font-size: 1.3rem;
  margin-right: 10px;
  color: #fad711;
}

footer span,
footer strong {
  font-size: 1.1rem;
}
</style>
