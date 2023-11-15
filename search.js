const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-bar");

const searchContainer = document.getElementById("search-container");

const searchURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

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

    //Troviamo l'artista
    for (let i = 0; i < responseObj.data.length; i++) {
      if (
        responseObj.data[i].artist.name
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
        const artist = responseObj.data[i].artist;
        // console.log(artist);

        searchContainer.innerHTML = "";

        const titleArtist = document.createElement("h2");
        titleArtist.classList = "col-6 mb-3";
        titleArtist.innerText = "Risultato più rilevante";

        const titleSong = document.createElement("h2");
        titleSong.classList = "col-6 mb-3";
        titleSong.innerText = "Brani";

        const col = document.createElement("div");
        col.classList = "col-5 col-xxl-6";

        const artistCard = document.createElement("div");
        artistCard.classList = "card border-0 bg-spotify p-3";

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
      }
    }

    // const artist = responseObj.data[0].artist;

    const album = responseObj.data[1].album;
    // console.log(album);
  } catch (error) {
    console.log("errore nella ricerca artista", error);
  }
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchArtist();
});
