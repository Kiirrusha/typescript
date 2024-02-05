"use strict";
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
let query = "";
inputSearch?.addEventListener("input", (e) => {
    let target = e.target;
    query = target.value.toUpperCase();
});
let queryId = "";
inputIdSearch?.addEventListener("input", (e) => {
    let target = e.target;
    queryId = target.value.toUpperCase();
});
btnSearch?.addEventListener("click", async () => {
    if (!query)
        return error();
    parsQuery(query);
});
let id;
btnSearchId?.addEventListener("click", async () => {
    if (!parseInt(queryId))
        return error();
    parsQuery(queryId, (id = true));
});
async function parsQuery(query, id = false) {
    resultContainer.style.visibility = "hidden";
    spinner.style.visibility = "visible";
    messageBody.innerHTML = "";
    let Select;
    (function (Select) {
        Select["people"] = "people";
        Select["planets"] = "planets";
        Select["species"] = "species";
    })(Select || (Select = {}));
    let select;
    // ****************
    let starWarsData;
    // ***********************
    if (!id) {
        select = selectList.value;
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
        starWarsData = starWarsData.results[0];
        if (select === "people" && starWarsData) {
            const idPlanet = starWarsData["homeworld"].split("/").at(-2);
            const homePlanet = await starWars.getPlanetsById(idPlanet);
            starWarsData.homeworld = homePlanet.name;
        }
    }
    if (id) {
        select = selectListId.value;
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
    spinner.style.visibility = "hidden";
    resultContainer.style.visibility = "visible";
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
