import { Router } from "express";
import { fetchCityWeather } from "../controllers/cityController.js";
import City from "../models/City.js";

const router = Router();

router.get("/:name", async (req, res) => {
  try {
    const cityName = req.params.name;
    const cityWeather = await fetchCityWeather(cityName);
    res.send(cityWeather);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCities = await City.find();
    res.send(allCities);
  } catch (error) {
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
