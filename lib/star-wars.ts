// Модуль для работы с API Star Wars.
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Код ниже разбирать не нужно.
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.js.

const starWars = {
  // --- Search Methods ---

  searchCharacters: (query: string) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/people/?search=${query}`)
        .then((response) => response.json())
        .then((characters) => resolve(characters))
        .catch((err) => {
          console.log("searchCharacters error: ", err), reject(err);
        });
    });
  },

  searchPlanets: (query: string) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/planets/?search=${query}`)
        .then((response) => response.json())
        .then((planets) => resolve(planets))
        .catch((err) => {
          console.log("searchPlanets error: ", err), reject(err);
        });
    });
  },

  searchSpecies: (query: string) => {
    return new Promise((resolve, reject) => {
      fetch(`https://swapi.dev/api/species/?search=${query}`)
        .then((response) => response.json())
        .then((species) => resolve(species))
        .catch((err) => {
          console.log("searchSpecies error: ", err);
          reject(err);
        });
    });
  },

  // --- Get By Id Methods ---

  getCharactersById: async (id: string | undefined) =>
    await (await fetch(`https://swapi.dev/api/people/${id}`)).json(),

  getPlanetsById: async (id: string | undefined) =>
    await (await fetch(`https://swapi.dev/api/planets/${id}`)).json(),

  getSpeciesById: async (id: string | undefined) =>
    await (await fetch(`https://swapi.dev/api/species/${id}`)).json(),

  getFilmsById: async (id: string | undefined) =>
    await (await fetch(`https://swapi.dev/api/films/${id}`)).json(),
};
