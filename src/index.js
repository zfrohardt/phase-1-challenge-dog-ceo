console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", event => {
    randomDogImages();
    dogBreedList();
})

let randomDogImages = () => {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(json => {
        let imageContainer = document.getElementById("dog-image-container");
        for (imageURL of json.message) {
            let img = document.createElement("img");
            img.src = imageURL;
            imageContainer.appendChild(img);
        }
    })
}

let dogBreedList = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => {
        let breedList = document.getElementById("dog-breeds");
        for (breed in json.message) {
            if (json.message[breed].length === 0) {
                breedList.appendChild(getListItem(breed));
            } else {
                for (breedPrefix of json.message[breed]) {
                    breedList.appendChild(getListItem(`${breedPrefix} ${breed}`))
                }
            }
        }
    })
}

let getListItem = string => {
    let li = document.createElement('li');
    li.innerText = string;
    li.addEventListener("click", event => {
        event.target.style.color = "blue";
        console.dir(event.target)
    })

    return li;
}