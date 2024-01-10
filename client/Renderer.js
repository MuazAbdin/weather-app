class Renderer {
  /* ATTRIBUTES */
  #cityTemplate;
  #homeTemplate;
  #citiesContainer = $(DOM_ELEMENTS.citiesContainer);
  #homeCity = $(DOM_ELEMENTS.homeCity);

  /* CONSTRUCTOR */
  constructor() {
    this.#cityTemplate = Handlebars.compile($("#city-template").html());
    this.#homeTemplate = Handlebars.compile($("#home-template").html());
    this.#registerHelpers();
    this.#registerPartials();
  }

  /* PRIVATE */
  #registerHelpers() {}
  #registerPartials() {}

  /* PUBLIC API */
  renderAllCities(cities) {
    this.#homeCity.hide();
    this.#citiesContainer.empty();
    this.#citiesContainer.append(this.#cityTemplate({ cities }));
    this.#citiesContainer.show();
  }
  renderHome(homeCity) {
    this.#citiesContainer.hide();
    this.#homeCity.empty();
    this.#homeCity.append(this.#homeTemplate(homeCity));
    this.#homeCity.show();
  }
}
