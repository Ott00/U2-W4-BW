const playlists = [
  {
    img: "./assets/imgs/main/image-1.jpg",
    name: "Giù",
    artist: "Neima Ezza"
  },
  {
    img: "./assets/imgs/main/image-2.jpg",
    name: "Pov: la tua estate è un bel film",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-5.jpg",
    name: "Lo-fi Beats",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-6.jpg",
    name: "Jazz Vibes",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-7.jpg",
    name: "Caffè del buongiorno",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-8.jpg",
    name: "Sangue Giovane",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-9.jpg",
    name: "Canta Sotto La Doccia",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-17.jpg",
    name: "New Music Friday",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-18.jpg",
    name: "Estate 2023",
    artist: "Spotify"
  },
  {
    img: "./assets/imgs/main/image-19.jpg",
    name: "Street Culto",
    artist: "Spotify"
  }
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

const getCorrectGreeting = (placeholderHtml) => {
  const date = new Date();
  const time = date.getHours();

  if (time < 12) {
    placeholderHtml.innerText = "Buongiorno";
  }
  if (time > 12 && time < 18) {
    placeholderHtml.innerText = "Buon Pomeriggio";
  }
  if (time > 18) {
    placeholderHtml.innerText = "Buonasera";
  }
};

const loadInterestCards = () => {
  const cardContainer = document.getElementById("interest-card-container");

  const randomizedPlaylists = shuffle(playlists);

  randomizedPlaylists.forEach((playlist) => {
    const cardCol = document.createElement("div");
    cardCol.classList = "col-6 col-md-2";
    const card = document.createElement("div");
    card.classList = "w-100 card p-3 shadow mb-3 bg-dark-2 border-0 pointer";
    // card.style = "width: calc(20% - 1rem)";
    card.innerHTML = `
    <img
      src="${playlist.img}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body p-0 py-2">
        <h5 class="card-title text-truncate fs-6 my-2 fw-bold">${playlist.name}</h5>
        <p class="card-text badge rounded-3 bg-spotify p-2 ">${playlist.artist}</p>
    </div>
    `;

    cardCol.appendChild(card);
    cardContainer.appendChild(cardCol);
  });
};

window.onload = () => {
  const greetingPlaceholder = document.getElementById("time-greeting");
  getCorrectGreeting(greetingPlaceholder);
  loadInterestCards();
};
