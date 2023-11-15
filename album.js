document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get("albumId");

  if (!albumId) {
    console.error("ID dell'album non trovato nella query string");
  }

  try {
  } catch (error) {}
});
