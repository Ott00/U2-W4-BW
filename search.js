const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-bar");

const searchContainer = document.getElementById("search-container");

const searchURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
// const artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const searchArtist = async function () {
  try {
    const response = await fetch(searchURL + searchInput.value, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6969464db2msh57ee0909918148fp1b3cafjsn9608ba4cbef4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
      }
    });

    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const responseObj = await response.json();
    console.log(responseObj);

    const allAlbums = [];

    //Troviamo l'artista
    for (let i = 0; i < responseObj.data.length; i++) {
      const element = responseObj.data[i];
      if (
        element.artist.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            searchInput.value
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      ) {
        const artist = element.artist;
        // console.log(artist);
        const artistId = element.artist.id;
        // console.log(artistId);

        searchContainer.innerHTML = "";

        const titleSong = document.createElement("h2");
        titleSong.classList = "d-none d-lg-block col-6 mb-3";
        titleSong.innerText = "Brani";

        const titleArtist = document.createElement("h2");
        titleArtist.classList = "col-12 col-lg-6 mb-3 px-4 px-md-0";
        titleArtist.innerText = "Risultato più rilevante";

        const col = document.createElement("div");
        col.classList = "col-12 col-lg-6 px-4 px-md-0";

        const artistCard = document.createElement("div");
        artistCard.classList =
          "card border-0 bg-spotify p-3 bg-dark-2 pointer ";

        artistCard.addEventListener("click", function () {
          window.location.assign("./artist.html?artistId=" + artistId);
          searchInput.value = "";
        });

        const cardImg = document.createElement("img");
        cardImg.classList = "card-img-top w-25 rounded-circle shadow-lg";
        cardImg.src = artist.picture_big;

        const cardBody = document.createElement("div");
        cardBody.classList = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.classList = "card-title";
        cardTitle.innerText = artist.name;

        const cardText = document.createElement("p");
        cardText.classList = "card-text badge bg-dark";
        cardText.innerText =
          artist.type.charAt(0).toUpperCase() + artist.type.slice(1);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardBody);
        col.appendChild(artistCard);

        searchContainer.appendChild(titleArtist);
        searchContainer.appendChild(titleSong);
        searchContainer.appendChild(col);

        allAlbums.push(element.album);
        // console.log(allAlbums);
      }
    }

    const col = document.createElement("div");
    col.classList = "col-12 col-lg-6";

    const list = document.createElement("ul");
    list.classList = "m-0 p-0 mt-3 mt-lg-0 px-4 px-md-1 ";
    list.setAttribute("id", "list-songs");

    //Troviamo le sue canzoni più popolari
    responseObj.data.forEach((element) => {
      const listElem = document.createElement("li");
      listElem.innerHTML = `
      <li class="row mb-3 border-bottom py-2 pointer">
        <div class="col-2 col-md-1">
          <img
            width="60px"
            src="${element.album.cover_small}"
            alt=""
          />
          </div>
          <div class="col-8 col-md-9 d-flex align-items-center">
          <div class="ms-1 ms-md-5 d-flex flex-column gap-1 w-100">
            <h5 class="m-0 text-truncate">${element.title}</h5>
            <div class="d-flex">
              <span class="badge bg-secondary h-100 me-1">${
                element.explicit_lyrics ? "E" : ""
              }</span>
              <p class="m-0 align-self-center">${element.artist.name}</p>
            </div>
          </div>
          </div>
        <div class="col-2 text-end align-self-center">${(
          element.duration / 60
        ).toFixed(2)}</div>
      </li>
      `;

      list.appendChild(listElem);
      col.appendChild(list);

      searchContainer.appendChild(col);
    });

    // const artist = responseObj.data[0].artist;

    // const album = responseObj.data[1].album;

    // ABBIAMO CREATO UN ARRAY DI ALBUM PER POI FILTRARLO IN BASE AL VALORE DEL SUO TITOLO , IN MODO DA ELIMIARE I DOPPIONI
    const filteredAlbums = [
      ...new Map(allAlbums.map((element) => [element.title, element])).values()
    ];

    console.log(filteredAlbums);

    localStorage.setItem("albums", JSON.stringify(filteredAlbums));
    localStorage.setItem("dataObj", JSON.stringify(responseObj.data));

    // console.log(album);
  } catch (error) {
    console.log("errore nella ricerca artista", error);
  }
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchArtist();

  const backBtn = document.getElementById("go-back");
  backBtn.addEventListener("click", () => {
    history.back();
  });

  const forwardBtn = document.getElementById("go-forward");
  forwardBtn.addEventListener("click", () => {
    history.forward();
  });
});
