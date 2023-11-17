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

window.onload = () => {
  const greetingPlaceholder = document.getElementById("time-greeting");
  getCorrectGreeting(greetingPlaceholder);
};
