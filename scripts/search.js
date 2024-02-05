// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

const btnSearch = document.getElementById("byQueryBtn");
const btnSearchId = document.getElementById("byQueryBtnId");
const inputSearch = document.querySelector(".input");
const inputIdSearch = document.querySelector(".inputId");
const spinner = document.querySelector(".spinner");
const resultContainer = document.getElementById("result-container");
const messageBody = document.getElementById("content");
const messageHeader = document.querySelector(".message-header");
const selectList = document.querySelector(".select");
const selectListId = document.querySelector(".selectId");

btnSearch.addEventListener("click", async () => {
  if (!query) return error();
  parsQuery(query);
});

btnSearchId.addEventListener("click", async () => {
  if (!parseInt(queryId)) return error();
  parsQuery(queryId, (id = true));
});

let query = "";
inputSearch.addEventListener(
  "input",
  (e) => (query = e.target.value.toUpperCase())
);

let queryId = "";
inputIdSearch.addEventListener(
  "input",
  (e) => (queryId = e.target.value.toUpperCase())
);

function parsQuery(query, id = false) {
  resultContainer.style.visibility = "hidden";

  spinner.style.visibility = "visible";
  messageBody.innerHTML = "";

  select = null;
  let starWarsData = null;

  if (!id) {
    select = selectList.value;

    switch (select) {
      case "people":
        starWarsData = starWars.searchCharacters(query);
        break;
      case "planets":
        starWarsData = starWars.searchPlanets(query);
        break;
      case "species":
        starWarsData = starWars.searchSpecies(query);
    }
  }

  if (id) {
    select = selectListId.value;

    switch (select) {
      case "people":
        starWarsData = starWars.getCharactersById(query).then((query) => {
          if (query.detail) {
            return;
          } else {
            return query;
          }
        });
        break;
      case "planets":
        starWarsData = starWars.getPlanetsById(query).then((query) => {
          if (query.detail) {
            return;
          } else {
            return query;
          }
        });
        break;
      case "species":
        starWarsData = starWars.getSpeciesById(query).then((query) => {
          if (query.detail) {
            return;
          } else {
            return query;
          }
        });
    }
  }

  starWarsData
    .then((value) => {
      if (!id) {
        starWarsData = value.results[0];
      } else {
        starWarsData = value;
      }

      if (select === "people" && starWarsData) {
        const idPlanet = starWarsData["homeworld"].split("/").at(-2);
        starWars.getPlanetsById(idPlanet).then((value) => {
          starWarsData.homeworld = value.name;
        });
      }
    })
    .then(() => {
      resultMessage(starWarsData);
    })
    .finally(() => {
      spinner.style.visibility = "hidden";
      resultContainer.style.visibility = "visible";
    });
}

function resultMessage(resultsArray) {
 
  if (resultsArray === undefined) {
    messageHeader.innerHTML = "Not found";
    return alert("Ошибка в запросе");
  }
  messageHeader.innerHTML = resultsArray.name;

  for (let key in resultsArray) {
    if (key === "films" || key === "residents") {
      messageBody.innerHTML += `${key}:<br>`;
      for (let keyFilms in resultsArray[key]) {
        messageBody.innerHTML += `\u00A0\u00A0${resultsArray[key][keyFilms]}<br>`;
      }
      continue;
    }
    messageBody.innerHTML += `${key}: ${resultsArray[key]}<br>`;
  }
}

function error() {
  alert("Введите корректные данные");
}

// fetch(`https://swapi.dev/api/people/`)
//   .then((response) => response.json())
//   .then((value) => console.log(value));

console.log("123")
