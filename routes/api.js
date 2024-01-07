import axios from "axios";
import { Router } from "express";
import moment from "moment";
import { getCityWeather } from "../controllers/cityController.js";

const router = Router();

router.get("/:name", async (req, res) => {
  try {
    const cityName = req.params.name;
    const cityWeather = await getCityWeather(cityName);
    res.send(cityWeather);
  } catch (error) {
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
