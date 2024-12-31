import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://weathercodibly.onrender.com"
    : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 180000,
});

export const fetchWeatherSummary = async (latitude, longitude) => {
  try {
    const response = await axiosInstance.get(
      `/weather/summary?latitude=${latitude}&longitude=${longitude}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather summary:", error.message);
    throw error;
  }
};

export const fetchWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await axiosInstance.get(
      `/weather/forecast?latitude=${latitude}&longitude=${longitude}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
    throw error;
  }
};
