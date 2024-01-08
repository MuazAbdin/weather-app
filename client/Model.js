class Model {
  /* ATTRIBUTES */
  #data = [];

  /* CONSTRUCTOR */
  constructor() {}

  /* PRIVATE */
  #insertCity(city) {
    const idx = this.#data.findIndex(
      (c) => c.name.toLowerCase() === city.name.toLowerCase()
    );
    if (idx === -1) {
      city.isSaved = false;
      this.#data.splice(0, 0, city);
      return 0;
    }
    city.isSaved = this.#data[idx].isSaved;
    this.#data.splice(idx, 1, city);
    return idx;
  }

  /* PUBLIC API */
  async fetchAllCiteis() {
    const allCiteis = await $.ajax(`http://localhost:3000/weather/v1/cities/`);
    this.#data = allCiteis.map((c) => ({ ...c, isSaved: true }));
  }

  async fetchCity(cityName, cityCoords) {
    const fitler = cityName ? { cityName } : cityCoords;
    const city = await $.ajax({
      url: `http://localhost:3000/weather/v1/cities/`,
      method: "GET",
      data: fitler,
    });
    const cityIdx = this.#insertCity(city);
    if (this.#data[cityIdx].isSaved) await this.saveCity(cityIdx);
    return this.#data[cityIdx];
  }

  async saveCity(cityIdx) {
    await $.ajax({
      url: `http://localhost:3000/weather/v1/cities/`,
      method: "POST",
      data: this.#data[cityIdx],
    });
    this.#data[cityIdx].isSaved = true;
  }

  async updateCity(cityIdx) {
    const cityName = this.#data[cityIdx].name;
    const updatedCity = await $.ajax({
      url: `http://localhost:3000/weather/v1/cities/${cityName}`,
      method: "PATCH",
    });
    updatedCity.isSaved = this.#data[cityIdx].isSaved;
    this.#data.splice(cityIdx, 1, updatedCity);
    return updatedCity;
  }

  async removeCity(cityIdx) {
    const cityName = this.#data[cityIdx].name;
    await $.ajax({
      url: `http://localhost:3000/weather/v1/cities/${cityName}`,
      method: "DELETE",
    });
    const removedCity = this.#data.splice(cityIdx, 1);
    return removedCity;
  }

  get data() {
    return this.#data;
  }
}
