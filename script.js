//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = `Search ${episodeList.length} episodes
                    
                        <select id="episode-list"> </select>
                        <input type="search" id="site-search" placeholder="Search item">`; //Create search field

  //Create div for whole list of episodes
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";

  episodes.innerHTML = createNewList(episodeList);
  rootElem.appendChild(episodes);

  let inputField = document.querySelector("#site-search");
  let dropDownMenu = document.querySelector("#episode-list");

  dropDownMenu.addEventListener("change", function (event) {
    const episodeId = event.target.value;

    let episodesFilteredById = episodeList.filter(
      (episode) => episode.id == episodeId
    );
    episodes.innerHTML = createNewList(episodesFilteredById);
  });

  dropDownMenu.innerHTML = createDropDownMenu(episodeList);

  inputField.addEventListener("keyup", function () {
    let filteredEpisodes = episodeList.filter(
      (episode) =>
        episode.summary.toLowerCase().includes(inputField.value) ||
        episode.name.toLowerCase().includes(inputField.value)
    );
    episodes.innerHTML = createNewList(filteredEpisodes);
  });
}
function createNewList(episodeList) {
  return episodeList
    .map(function (item) {
      return `<div class="episode">
            <h1 class="heading">${
              item.name
            } - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
            <img class="image" src=${item.image.medium} alt= ${item.name}
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

window.onload = setup;
