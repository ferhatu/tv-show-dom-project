//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = `Search ${episodeList.length} episode(s)
                        <input type="search" id="site-search">`; //Create search field

  //Create div for whole list of episodes
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";

  episodes.innerHTML = createNewList(episodeList);
  rootElem.appendChild(episodes);

  let inputField = document.querySelector("#site-search");

  inputField.addEventListener("keyup", function () {
    let filteredEpisodes = episodeList.filter(
      (key) =>
        key.summary.includes(inputField.value) ||
        key.name.includes(inputField.value)
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
window.onload = setup;

// let inputField = document.createElement("input");
// inputField.setAttribute("type", "search");
// rootElem.appendChild(inputField);
