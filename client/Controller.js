const model = new Model();
const renderer = new Renderer();

const citiesContainer = $(DOM_ELEMENTS.citiesContainer);
const searchInput = $(DOM_ELEMENTS.searchInput);

async function getCityWeather(event) {
  try {
    event.preventDefault();
    const cityName = searchInput.val();
    if (cityName === "") return;
    await model.fetchCity(cityName);
    searchInput.val("");
    renderer.renderAllCities(model.data);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

function getLocationCoords() {
  const coords = { lat: 31.78, lon: 35.23 };
  if (!navigator.geolocation) return coords;
  navigator.geolocation.getCurrentPosition((pos) => {
    coords.lat = pos.coords.latitude;
    coords.lon = pos.coords.longitude;
  });
  return coords;
}

async function getHomeCity() {
  try {
    const coords = getLocationCoords();
    const homeCity = await model.fetchCity(null, coords);
    renderer.renderHome(homeCity);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

async function showSavedCities() {
  try {
    await model.fetchAllCiteis();
    renderer.renderAllCities(model.data);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
}

citiesContainer.on("click", ".fa-plus", async function () {
  try {
    const idx = $(this).closest(DOM_ELEMENTS.cityCard).attr("id").split("-")[1];
    await model.saveCity(idx);
    renderer.renderAllCities(model.data);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});

citiesContainer.on("click", ".fa-trash-can", async function () {
  try {
    const idx = $(this).closest(DOM_ELEMENTS.cityCard).attr("id").split("-")[1];
    await model.removeCity(idx);
    renderer.renderAllCities(model.data);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});

citiesContainer.on("click", ".fa-arrows-rotate", async function () {
  try {
    const idx = $(this).closest(DOM_ELEMENTS.cityCard).attr("id").split("-")[1];
    await model.updateCity(idx);
    renderer.renderAllCities(model.data);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
});
