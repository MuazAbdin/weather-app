import axios from "axios";
import moment from "moment";

export const getCityWeather = async (cityName) => {
  const { weather, main, dt, sys, name } = (
    await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${process.env.API_KEY}&units=metric`
    )
  ).data;
  return {
    name: `${name}, ${sys.country}`,
    temperature: main.feels_like,
    condition: weather[0].main,
    conditionPic: weather[0].icon,
    lastUpdated: moment.unix(dt).format("LLLL"),
  };
};
