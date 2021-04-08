console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", event => {
    randomDogImages();
})

let randomDogImages = () => {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(json => {
        let imageContainer = document.getElementById("dog-image-container");
        for(imageURL of json.message) {
            let img = document.createElement("img");
            img.src = imageURL;
            imageContainer.appendChild(img);
        }
    })
}