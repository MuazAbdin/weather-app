import axios from "axios";
import { Router } from "express";
import moment from "moment";

const router = Router();

router.get("/:name", async (req, res) => {
  try {
    const cityName = req.params.name;
    const { lat, lon } = (
      await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.API_KEY}`
      )
    ).data[0];
    console.log(`${lat} ${lon}`);
    const current = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${process.env.API_KEY}`
    ).data;
    // const { dt, temp, weather } = current;
    res.send(current);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

router.delete("/:name", async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

export default router;
