const trackList = async function (tracks) {
  const trackListContainer = document.getElementById("album-tracks-list");
  let counter = 1;

  function convertSecondsToMinutesTracks(seconds) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    const result = minutes + ":" + extraSeconds;
    return result;
  }

  tracks.forEach((track) => {
    const trackListElement = document.createElement("li");
    trackListElement.classList = "row mb-3";

    trackListElement.innerHTML = `     
    <div class="col-1 text-start pe-0 align-self-center">
        ${counter++}
    </div>
    <div class="col-4 text-start px-0 ps-2 align-self-center">
    <div class="d-flex flex-column justify-content-center">
     <span>${track.title}</span>
     <span class="fs-8">${track.artist.name}</span>
    </div>
    </div>
    <div class="col-4 text-end px-0 align-self-center">
     ${track.rank}
    </div>
    <div class="col-3 text-end px-1 align-self-center">
     ${convertSecondsToMinutesTracks(track.duration)}
    </div>`;

    trackListContainer.appendChild(trackListElement);
  });
};

const albumPage = async function () {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get("albumId");
  //   const albumId = 13994766;
  const albumURL = "https://deezerdevs-deezer.p.rapidapi.com/album/";

  try {
    const response = await fetch(albumURL + albumId, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6969464db2msh57ee0909918148fp1b3cafjsn9608ba4cbef4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    });

    const album = await response.json();
    console.log(album);

    function convertSecondsToMinutes(seconds) {
      let minutes = Math.floor(seconds / 60);
      let extraSeconds = seconds % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
      const result = minutes + " min " + extraSeconds + " sec.";
      return result;
    }

    const albumCover = document.getElementById("album-cover");
    const albumTitle = document.getElementById("album-title");
    const albumArtistName = document.getElementById("album-artist");
    const albumYear = document.getElementById("album-year");
    const albumTotalSongs = document.getElementById("album-total-songs");
    const albumTotalTime = document.getElementById("album-total-time");
    const albumArtistProfileImg = document.getElementById(
      "profile-picture-album-page"
    );

    albumCover.src = album.cover_medium;
    albumTitle.innerText = album.title;

    albumArtistProfileImg.src = album.artist.picture_small;
    albumArtistName.innerText = album.artist.name;
    albumYear.innerText = album.release_date.substr(0, 4);
    albumTotalSongs.innerText = album.nb_tracks + " brani,";
    albumTotalTime.innerText = convertSecondsToMinutes(album.duration);

    console.log(album.tracks);

    trackList(album.tracks.data);
  } catch (error) {
    console.log("errore nella ricerca dell'album", error);
  }
};

window.onload = () => {
  albumPage();
};
