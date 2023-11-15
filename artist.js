document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const artistId = params.get("artistId");

  const artistURL = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
  //   if (!artistId) {
  //     console.error("Errore nella ricerca della pagina dell'artista");
  //   }

  try {
    const response = await fetch(artistURL + 7371074, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6969464db2msh57ee0909918148fp1b3cafjsn9608ba4cbef4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    const artist = await response.json();
    console.log(artist);
  } catch (error) {}
});
