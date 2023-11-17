const colorThief = new ColorThief();
const img = document.getElementById("album-cover");
console.log(img)
const tiltedImg = document.getElementsByClassName("rotate-image");
console.log(tiltedImg)

window.addEventListener("load", () => {
    imgArr = Array.from(tiltedImg)
    console.log(imgArr)

    imgArr.forEach((elem) => {
        const color = colorThief.getColor(elem);
        console.log(elem)
        const colorStr = JSON.stringify(color)
        console.log(colorStr)
        const rgbValue = colorStr.replaceAll("[", "(").replaceAll("]", ")")
        console.log(rgbValue)
        const changeBg = elem.closest("div")
        changeBg.style.backgroundColor = "rgb" + rgbValue;
    })
}
)
