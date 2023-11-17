const artistHead = document.getElementById("central-bar-container");
const artistName = document.getElementById("artist-name");
const artistFan = document.getElementById("artist-fan");

const artistPageAlbumList = async function () {
  const artistAlbums = JSON.parse(localStorage.getItem("albums"));
  console.log(artistAlbums);

  const artistiRepertoire = document.getElementById("artist-repertoire");
  const albumContainer = document.createElement("div");
  albumContainer.classList = "d-flex flex-wrap gap-3 my-4";

  artistAlbums.forEach((album) => {
    const albumItem = document.createElement("div");
    albumItem.classList = "album-card bg-dark p-2 rounded h-100";
    albumItem.innerHTML = `
      <img
         width="100%"
        class="img-fluid rounded"
        src="${album.cover_xl}"
        alt=""/>
      <span class="d-block fs-6 mt-1 text-truncate fw-bold ">${album.title}</span>
      <p class="fs-7">Album</p>
    `;

    // console.log(album.id);
    const albumId = album.id;
    albumItem.addEventListener("click", () => {
      window.location.assign("./album.html?albumId=" + albumId);
    });

    albumContainer.appendChild(albumItem);
  });

  artistiRepertoire.appendChild(albumContainer);
};

const artistPageSongsList = async function (numberoOfElement = 5) {
  //ABBIAMO RIPESCATO DALOCAL S. TUTTI GLI ALBUM SALVATI AL MOMENTO DEL SEARCH (FILTRATI PER NON AVERE DOPPIONI)

  const dataObj = JSON.parse(localStorage.getItem("dataObj"));
  console.log(dataObj);

  const list = document.getElementById("list-popular-songs");
  list.innerHTML = "";

  for (let i = 0; i < numberoOfElement; i++) {
    const element = dataObj[i];

    const listElem = document.createElement("li");
    listElem.innerHTML = `
    <div class="row mb-1 py-2">
      <div class="col-1">
        ${i + 1}
        </div>
      <div class="col-1">
        <img
          width="40px"
          src="${element.album.cover_small}"
          alt=""
        />
        </div>
        <div class="col-8 d-flex align-items-center">
        <div class="d-flex flex-column gap-1 w-100">
          <h5 class="m-0 text-truncate fs-6">${element.title}</h5>
          <div class="d-flex">
            <span class="badge bg-secondary h-100 me-1 fs-9">${
              element.explicit_lyrics ? "E" : ""
            }</span>
          </div>
        </div>
        </div>
      <div class="col-2 text-end align-self-center">${(
        element.duration / 60
      ).toFixed(2)}</div>
    </div>
    `;

    list.appendChild(listElem);
  }
};

const artistPage = async function () {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get("artistId");

  // const artistId = 7371074;

  const artistURL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
  //   if (!artistId) {
  //     console.error("Errore nella ricerca della pagina dell'artista");
  //   }

  try {
    const response = await fetch(artistURL + artistId, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6969464db2msh57ee0909918148fp1b3cafjsn9608ba4cbef4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
      }
    });

    const artist = await response.json();
    console.log(artist);
    artistHead.style.backgroundImage = `url("${artist.picture_xl}")`;
    artistName.innerText = artist.name;
    artistFan.innerText = artist.nb_fan;
  } catch (error) {
    console.log("errore nella creazione dinamica", error);
  }
  artistPageSongsList();
  artistPageAlbumList();
};

window.onload = () => {
  artistPage();

  let showMoreSongsNumber = 5;
  const showMoreSongs = document.getElementById("show-more-songs");

  showMoreSongs.addEventListener("click", () => {
    showMoreSongsNumber === 10
      ? (showMoreSongsNumber = 5)
      : (showMoreSongsNumber = 10);
    showMoreSongs.innerText =
      showMoreSongsNumber === 10 ? "Mostra meno" : "Visualizza altro";
    artistPageSongsList(showMoreSongsNumber);
  });

  const backBtn = document.getElementById("go-back");
  backBtn.addEventListener("click", () => {
    history.back();
  });

  const forwardBtn = document.getElementById("go-forward");
  forwardBtn.addEventListener("click", () => {
    history.forward();
  });
};
