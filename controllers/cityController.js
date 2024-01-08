import axios from "axios";
import moment from "moment";

const getWeatherQueries = (searchKey) => {
  const { cityName, lat, lon } = searchKey;
  const params = {
    APPID: process.env.WEATHER_API_KEY,
    units: "metric",
  };
  if (cityName) params.q = cityName;
  else {
    params.lat = lat;
    params.lon = lon;
  }
  return params;
};

export const fetchCityWeather = async (searchKey) => {
  const params = getWeatherQueries(searchKey);
  const response = await axios.get(process.env.WEATHER_BASE_URL, { params });
  const { weather, main, dt, sys, name } = response.data;
  return {
    name: name,
    country: sys.country,
    temperature: Math.round(main.feels_like),
    condition: weather[0].description,
    conditionPic: weather[0].icon,
    lastUpdated: moment.unix(dt).format("LLLL"),
  };
};
