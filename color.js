const colorThief = new ColorThief();
const img = document.getElementById('album-image');
console.log(img)

// Make sure image is finished loading
window.onload = () => {
    if (img.complete) {
        const color = colorThief.getColor(img);
        console.log(color)
        const colorStr = JSON.stringify(color)
        console.log(colorStr)
        const rgbValue = colorStr.replaceAll("[", "(").replaceAll("]", ")")
        console.log(rgbValue)
        const changeBg = document.getElementById("central-bar-container")
        changeBg.style.backgroundColor = "rgb" + rgbValue;
    } else {
        image.addEventListener('load', function () {
            colorThief.getColor(img);
        });
    }
}
