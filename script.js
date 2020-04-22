//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();

  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = `Got ${episodeList.length} episode(s)
                        <input type="search" id="site-search">`; //Create search field

  //Create div for whole list of episodes
  let episodes = document.createElement("div");
  episodes.className = "episodeContainer";
  let newEpisodes = episodeList
    .map(function (item) {
      return `<div class="episode">
            <h1 class="heading">${
              item.name
            } - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
            <img class="image" src=${item.image.medium} alt= ${item.name}
            <p class="parag">${item.summary}</p>
            </div>`;
    })
    .join("");
  episodes.innerHTML = newEpisodes;
  rootElem.appendChild(episodes);
  // console.log(episodes);
  // console.log(episodeList);
  let inputField = document.querySelector("#site-search");
  inputField.addEventListener("keyup", function () {
    const result = episodeList.filter((key) =>
      (key.summary || key.name).includes(inputField.value)
    );
    // episodeList.filter((key) =>
    //   (key.summary || key.name).includes(inputField.value)
    return result;
  });
}

window.onload = setup;

// let inputField = document.createElement("input");
// inputField.setAttribute("type", "search");
// rootElem.appendChild(inputField);
