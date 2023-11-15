const artistHead = document.getElementById("central-bar-container");
const artistName = document.getElementById("artist-name");
const artistFan = document.getElementById("artist-fan");

const artistPage = async function () {
  const params = new URLSearchParams(window.location.search);
  // const artistId = params.get("artistId");

  const artistId = 7371074;

  const artistURL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
  //   if (!artistId) {
  //     console.error("Errore nella ricerca della pagina dell'artista");
  //   }

  try {
    const response = await fetch(artistURL + artistId, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6969464db2msh57ee0909918148fp1b3cafjsn9608ba4cbef4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    const artist = await response.json();
    console.log(artist);
    artistHead.style.backgroundImage = `url("${artist.picture_xl}")`;
    artistName.innerText = artist.name;
    artistFan.innerText = artist.nb_fan;
  } catch (error) {
    console.log("errore nella creazione dinamica", error);
  }
};

//ABBIAMO RIPESCATO DALOCAL S. TUTTI GLI ALBUM SALVATI AL MOMENTO DEL SEARCH (FILTRATI PER NON AVERE DOPPIONI)
const artistAlbums = JSON.parse(localStorage.getItem("albums"));

console.log(artistAlbums);

const artistPageAlbums = async function () {};

window.onload = () => {
  artistPage();
};
