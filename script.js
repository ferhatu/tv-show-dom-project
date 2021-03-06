//You can edit ALL of the code here
const rootElem = document.getElementById("root");
rootElem.innerHTML = `
  <div id="header">
    <button id="homebtn">Home</button>
    <select id="show-list"> </select>
    <select id="episode-list"> </select>
    <input type="search" id="site-search" placeholder="Search item">
    <p id="display"></p>
  </div>
  <div id="episodes" class="episodeContainer"></div>`; //Create search field
function setup() {
  fetch(`https://api.tvmaze.com/shows/1/episodes`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      makePageForEpisodes(data);
    });

  const shows = getAllShows();
  shows.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
  let showList = document.querySelector("#show-list");
  showList.innerHTML = createSerialSelectorMenu(shows);

  showList.addEventListener("change", function (event) {
    const showId = event.target.value;
    console.log(showId);

    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        makePageForEpisodes(data);
      });
  });

  //fetching data from API
}

function makePageForEpisodes(episodeList) {
  let episodes = document.getElementById("episodes");

  episodes.innerHTML = createNewList(episodeList);
  // let parag = document.getElementById("#display");
  // parag.textContent = episodes.length;

  let inputField = document.querySelector("#site-search");
  let dropDownMenu = document.querySelector("#episode-list");

  //Episode selector
  dropDownMenu.addEventListener("change", function (event) {
    const episodeId = event.target.value;

    let episodesFilteredById = episodeList.filter(
      (episode) => episode.id == episodeId
    );
    episodes.innerHTML = createNewList(episodesFilteredById);
  });

  dropDownMenu.innerHTML = createDropDownMenu(episodeList);

  //Search Field
  inputField.addEventListener("keyup", function () {
    let filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary
          .toLowerCase()
          .includes(inputField.value.toLowerCase()) ||
        episode.name.toLowerCase().includes(inputField.value.toLowerCase())
    );
    episodes.innerHTML = createNewList(filteredEpisodes);
    let counter = document.querySelector("#display");
    counter.innerHTML = `${filteredEpisodes.length} episodes`;
  });

  homebtn.addEventListener("click", function () {
    location.reload(true);
  });
}

function createNewList(episodeList) {
  let counter = document.querySelector("#display");
  counter.innerHTML = `${episodeList.length} episodes`;
  return episodeList
    .map(function (item) {
      return `<div class="episode">
            <h1 class="heading">${
              item.name
            } - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
            <img class="image" src=${
              item.image ? item.image.medium : null
            } alt= ${item.name}
            <p>${item.summary}</p>
            </div>`;
    })
    .join("");
}
function createDropDownMenu(episodeList) {
  return episodeList
    .map(function (item) {
      return `<option value =${item.id}>
  S${item.season
    .toString()
    .padStart(
      2,
      "0"
    )}E${item.number.toString().padStart(2, "0")} ${item.name}</option>`;
    })
    .join("");
}
function createSerialSelectorMenu(shows) {
  return shows
    .map(function (item) {
      return `<option value =${item.id}>
  ${item.name}</option>`;
    })
    .join("");
}

window.onload = setup;
