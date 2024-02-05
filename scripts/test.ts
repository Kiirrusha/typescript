// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

const btnSearch: HTMLElement | null = document.getElementById("byQueryBtn");
const btnSearchId: HTMLElement | null = document.getElementById("byQueryBtnId");
const inputSearch: HTMLInputElement | null = document.querySelector(".input");
const inputIdSearch: HTMLInputElement | null =
  document.querySelector(".inputId");
const spinner: HTMLElement | null = document.querySelector(".spinner");
const resultContainer: HTMLElement | null =
  document.getElementById("result-container");
const messageBody: HTMLElement | null = document.getElementById("content");
const messageHeader: HTMLElement | null =
  document.querySelector(".message-header");
const selectList: HTMLSelectElement | null = document.querySelector(".select");
const selectListId: HTMLSelectElement | null = document.querySelector(".selectId");

let query: string = "";
inputSearch?.addEventListener("input", (e) => {
  let target = e.target as HTMLInputElement;
  query = target.value.toUpperCase();
});

let queryId: string = "";
inputIdSearch?.addEventListener("input", (e) => {
  let target = e.target as HTMLInputElement;
  queryId = target.value.toUpperCase();
});

btnSearch?.addEventListener("click", async () => {
  if (!query) return error();
  parsQuery(query);
});

let id: boolean;
btnSearchId?.addEventListener("click", async () => {
  if (!parseInt(queryId)) return error();
  parsQuery(queryId, (id = true));
});

async function parsQuery(query: string, id = false) {
  resultContainer!.style.visibility = "hidden";

  spinner!.style.visibility = "visible";
  messageBody!.innerHTML = "";

  enum Select {
    people = "people",
    planets = "planets",
    species = "species",
  }

  interface StarWarsCharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }

  interface StarWarsResponse{
    count: number,
    next: string,
    previous: null,
    results: StarWarsCharacter[]
  }

  let select: keyof typeof Select;
  // ****************
  let starWarsData: Promise<StarWarsResponse> | unknown;
  // ***********************

  if (!id) {
    select = selectList!.value as keyof typeof Select;

    switch (select) {
      case "people":
        starWarsData = await starWars.searchCharacters(query);
        break;

      case "planets":
        starWarsData = await starWars.searchPlanets(query);
        break;

      case "species":
        starWarsData = await starWars.searchSpecies(query);
    }

    starWarsData = (starWarsData as StarWarsResponse).results[0];

    if (select === "people" && starWarsData) {
      const idPlanet = (starWarsData as StarWarsCharacter)["homeworld"].split("/").at(-2);
      const homePlanet = await starWars.getPlanetsById(idPlanet);
      (starWarsData as StarWarsCharacter).homeworld = homePlanet.name;
    }
  }

  if (id) {
    select = selectListId!.value as keyof typeof Select;

    switch (select) {
      case "people":
        starWarsData = await starWars.getCharactersById(query);
        break;

      case "planets":
        starWarsData = await starWars.getPlanetsById(query);
        break;

      case "species":
        starWarsData = await starWars.getSpeciesById(query);
        break;
    }
  }
  resultMessage(starWarsData);

  spinner!.style.visibility = "hidden";
  resultContainer!.style.visibility = "visible";
}

function resultMessage(resultsArray: any) {
  if (resultsArray === undefined) {
    messageHeader!.innerHTML = "Not found";
    return alert("Ошибка в запросе");
  }
  messageHeader!.innerHTML = resultsArray.name;

  for (let key in resultsArray) {
    if (key === "films" || key === "residents") {
      messageBody!.innerHTML += `${key}:<br>`;
      for (let keyFilms in resultsArray[key]) {
        messageBody!.innerHTML += `\u00A0\u00A0${resultsArray[key][keyFilms]}<br>`;
      }
      continue;
    }
    messageBody!.innerHTML += `${key}: ${resultsArray[key]}<br>`;
  }
}

function error() {
  alert("Введите корректные данные");
}
