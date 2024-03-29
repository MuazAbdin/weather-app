import { Router } from "express";
import { fetchCityWeather } from "../controllers/cityController.js";
import City from "../models/City.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const cityWeather = await fetchCityWeather(req.query);
      return res.send(cityWeather);
    }
    const allCities = await City.find();
    res.send(allCities);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).send(newCity);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.patch("/:name", async (req, res) => {
  try {
    const cityName = req.params.name;
    const cityWeather = await fetchCityWeather({ cityName });
    const updatedCity = await City.findOneAndUpdate(
      { name: cityName },
      {
        temperature: cityWeather.temperature,
        condition: cityWeather.condition,
        conditionPic: cityWeather.conditionPic,
        lastUpdated: cityWeather.lastUpdated,
      },
      { new: true }
    );
    if (!updatedCity) return res.send(cityWeather);
    return res.send(updatedCity);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const deletedCity = await City.findOneAndDelete({ name: req.params.name });
    if (!deletedCity)
      return res.status(404).send({ msg: "resource not found" });
    res.send(deletedCity);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

export default router;
