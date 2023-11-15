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
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error("General fetching error");
    }

    const responseObj = await response.json();
    console.log(responseObj);

    // const allNames = responseObj.data.map((element) => {
    //   return element.artist.name;
    // });
    // console.log(allNames);

    // //cancellati i nomi doppioni
    // const allNamesFiltered = [...new Set(allNames)];
    // console.log(allNamesFiltered);

    console.log(responseObj.data.length);

    for (let i = 0; i < responseObj.data.length; i++) {
      if (
        responseObj.data[i].artist.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") ===
        searchInput.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      ) {
        const artist = responseObj.data[i].artist;
        console.log(artist);

        searchContainer.innerHTML = "";

        const col = document.createElement("div");
        col.classList = "col-5";

        const artistCard = document.createElement("div");
        artistCard.classList = "card";

        const cardImg = document.createElement("img");
        cardImg.classList = "card-img-top";
        cardImg.src = artist.picture_big;

        const cardBody = document.createElement("div");
        cardBody.classList = "card-body";

        const cardTitle = document.createElement("h5");
        cardTitle.classList = "card-title";
        cardTitle.innerText = artist.name;

        const cardText = document.createElement("p");
        cardText.classList = "card-text";
        cardText.innerText = artist.type;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardBody);
        col.appendChild(artistCard);

        searchContainer.appendChild(col);
      }
    }

    // const artist = responseObj.data[0].artist;

    const album = responseObj.data[1].album;
    console.log(album);

    /* <div c   lass="card" >
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */
  } catch (error) {
    console.log("errore nella ricerca artista", error);
  }
};

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchArtist();
});
