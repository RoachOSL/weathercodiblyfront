<template>
  <div class="forecast-table-container">
    <h3 class="table-title">7-Day Weather Forecast</h3>
    <div class="d-none d-md-block table-wrapper">
      <table class="forecast-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather Icon</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Estimated Energy (kWh)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in forecastData" :key="day.date">
            <td>{{ formatDate(day.date) }}</td>
            <td>
              <i :class="getWeatherIcon(day.weatherCodes[0])"></i>
            </td>
            <td>{{ day.maxTempC }}</td>
            <td>{{ day.minTempC }}</td>
            <td>{{ day.estimatedEnergyKWh }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-md-none card-wrapper">
      <div class="forecast-card" v-for="day in forecastData" :key="day.date">
        <div class="card-header">
          {{ formatDate(day.date) }}
        </div>
        <div class="card-body">
          <p>
            <strong>Weather:</strong>
            <i :class="getWeatherIcon(day.weatherCodes[0])"></i>
          </p>
          <p><strong>Max Temp:</strong> {{ day.maxTempC }} °C</p>
          <p><strong>Min Temp:</strong> {{ day.minTempC }} °C</p>
          <p><strong>Energy:</strong> {{ day.estimatedEnergyKWh }} kWh</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const WEATHER_ICONS = {
  0: "fas fa-sun",
  1: "fas fa-cloud-sun",
  2: "fas fa-cloud",
  3: "fas fa-cloud",
  45: "fas fa-cloud",
  48: "fas fa-cloud",
  51: "fas fa-cloud-rain",
  53: "fas fa-cloud-rain",
  55: "fas fa-cloud-showers-heavy",
  56: "fas fa-cloud-rain",
  57: "fas fa-cloud-showers-heavy",
  61: "fas fa-cloud-showers-heavy",
  63: "fas fa-cloud-showers-heavy",
  65: "fas fa-cloud-showers-heavy",
  66: "fas fa-cloud-showers-heavy",
  67: "fas fa-cloud-showers-heavy",
  71: "fas fa-snowflake",
  73: "fas fa-snowflake",
  75: "fas fa-snowflake",
  77: "fas fa-snowflake",
  80: "fas fa-cloud-showers-heavy",
  81: "fas fa-cloud-showers-heavy",
  82: "fas fa-cloud-showers-heavy",
  85: "fas fa-snowflake",
  86: "fas fa-snowflake",
  95: "fas fa-bolt",
  96: "fas fa-bolt",
  99: "fas fa-bolt",
};

export default {
  name: "WeatherForecastTable",
  props: {
    forecastData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    getWeatherIcon(code) {
      return WEATHER_ICONS[code] || "fas fa-question";
    },
  },
};
</script>

<style scoped>
.forecast-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px;
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table-title {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #333;
}

.forecast-table {
  width: 100%;
  overflow-y: auto;
  width: 100%;
  border-collapse: collapse;
}

.forecast-table th,
.forecast-table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}

.forecast-table th {
  background: #f4f4f4;
  font-weight: bold;
}

.forecast-table td i {
  font-size: 1.5rem;
  color: #eda51f;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.forecast-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.forecast-card .card-header {
  font-weight: bold;
  font-size: 1.2rem;
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.forecast-card .card-body p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.forecast-card .card-body i {
  font-size: 1.5rem;
  color: #eda51f;
}
</style>
