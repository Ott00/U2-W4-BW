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

  let audioCorrente = null; // Memorizza l'audio corrente

  tracks.forEach((track) => {
    const trackListElement = document.createElement("li");
    trackListElement.classList = "row mb-3";

    trackListElement.innerHTML = `     
    <div class="wrapper col-1 text-start pe-0 align-self-center" role="button">
        <span class="box1">${counter++}</span>
        <span class="box2">
        <span class="d-none">${track.preview}</span>
        <button type="button" class=" btn text-start">
                 <div
                   class="icon-player-container d-flex justify-content-center align-items-center text-dark"
                   style="width: 25px; height: 25px"
                 >
                   <svg
                     data-encore-id="icon"
                     role="img"
                     aria-hidden="true"
                     viewBox="0 0 24 24"
                     class="Svg-sc-ytk21e-0 iYxpxA"
                     style="width: 10px; height: 10px"
                   >
                     <path
                       d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                     ></path>
                   </svg>
                 </div>
               </button>
        </span>
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

    const playBtnContent = trackListElement.getElementsByTagName("span")[0];
    const playBtn = trackListElement.getElementsByTagName("span")[1];
    const trackPreviewLink =
      trackListElement.getElementsByTagName("span")[2].innerText;

    console.log(audioCorrente);

    playBtn.addEventListener("click", function () {
      // Se c'è un audio corrente, interrompi la riproduzione

      if (audioCorrente) {
        audioCorrente.pause();

        // Se il link del nuovo audio è diverso dall'audio corrente, avvia la nuova traccia
        if (audioCorrente.src !== trackPreviewLink) {
          audioCorrente.src = null;
          console.log(audioCorrente.src);
          audioCorrente = new Audio(trackPreviewLink);
          aggiornaInputRange();
          playBarItems(track);
          audioCorrente.play();
        } else {
          // Se il link è lo stesso, imposta l'audio corrente a null (stop)
          audioCorrente.src = null;
        }
      } else {
        // Se non c'è un audio corrente, avvia la riproduzione del nuovo audio
        audioCorrente = new Audio(trackPreviewLink);
        aggiornaInputRange();
        playBarItems(track);
        audioCorrente.play();
        console.log(audioCorrente);
      }
    });
    trackListContainer.appendChild(trackListElement);
  });

  //FUNZIONI CHE PER IL CAMBIO DEL TEMPO DELLA CANZONE (VA MALE)

  function aggiornaInputRange() {
    if (audioCorrente) {
      var progress = (audioCorrente.currentTime / audioCorrente.duration) * 100;
      formRange.value = progress;
    } else {
      formRange.value = 0;
    }
  }

  const formRange = document.getElementById("form-range");

  formRange.addEventListener("input", function () {
    var nuovoTempo = (formRange.value / 100) * audioCorrente.duration;
    audioCorrente.currentTime = nuovoTempo;
  });
};

const playBarSongTitle = document.getElementById("playbar-song-title");
const playBarArtistName = document.getElementById("playbar-artist-name");

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
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
      }
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

    const albumTitleOnStickyBar = document.getElementById("name-album-2");

    const albumArtistName = document.getElementById("album-artist");
    const albumYear = document.getElementById("album-year");
    const albumTotalSongs = document.getElementById("album-total-songs");
    const albumTotalTime = document.getElementById("album-total-time");
    const albumArtistProfileImg = document.getElementById(
      "profile-picture-album-page"
    );
    const playBarImg = document.getElementById("playbar-img");

    albumCover.src = album.cover_xl;
    albumCover.crossOrigin = "Anonymous";
    albumTitle.innerText = album.title;
    albumTitleOnStickyBar.innerText = album.title;
    albumArtistProfileImg.src = album.artist.picture_small;
    albumArtistName.innerText = album.artist.name;
    albumYear.innerText = album.release_date.substr(0, 4);
    albumTotalSongs.innerText = album.nb_tracks + " brani,";
    albumTotalTime.innerText = convertSecondsToMinutes(album.duration);
    playBarImg.src = album.cover;
    playBarSongTitle.innerText = "";
    playBarArtistName.innerText = "";
    console.log(album.tracks);

    trackList(album.tracks.data);

    const colorThief = new ColorThief();
    // const img = document.getElementById("album-cover");
    // console.log(img)
    // // const tiltedImg = document.getElementsByClassName("rotate-image");
    // console.log(tiltedImg)
    // console.log(img)

    albumCover.addEventListener("load", () => {
      console.log(albumCover);
      const color = colorThief.getColor(albumCover);
      console.log(color);
      const colorStr = JSON.stringify(color);
      console.log(colorStr);
      const rgbValue = colorStr.replaceAll("[", "(").replaceAll("]", ")");
      console.log(rgbValue);
      const changeBg = document.getElementById("album-banner");
      changeBg.style.backgroundColor = "rgb" + rgbValue;
    });
  } catch (error) {
    console.log("errore nella ricerca dell'album", error);
  }
};

const playBarItems = (track) => {
  playBarSongTitle.innerText = track.title;
  playBarArtistName.innerText = track.artist.name;
};

window.onload = () => {
  albumPage();
};

// const containerTitle = document.getElementById("container-title");
// const albumTitleOnStickyBar = document.getElementById("name-album-2");

// window.addEventListener("scroll", function () {
//   let containerTop = containerTitle.getBoundingClientRect().top;

//   if (containerTop <= 0) {
//     // La parte superiore del contenitore è al top o sopra la viewport
//     albumTitleOnStickyBar.style.display = "block";
//   } else {
//     // La parte superiore del contenitore è sotto la viewport
//     albumTitleOnStickyBar.style.display = "none";
//   }
// });

// containerTitle.addEventListener("scroll", function (e) {
//   console.log(e);
//   const scrollPosition = containerTitle.scrollY;

//   const navbar = document.querySelector("nav");
//   const navBtn = document.getElementById("nav-button");
//   if (scrollPosition >= 350) {
//     navbar.className = "scrollNav";
//     navBtn.className = "scrollNavBtn";
//   } else {
//     navbar.className = "scrollNavBack";
//     navBtn.className = "scrollNavBtnBack";
//   }
// });
