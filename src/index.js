console.log('%c HI', 'color: firebrick')

let dogBreeds;

document.addEventListener("DOMContentLoaded", event => {
    randomDogImages();
    dogBreeds = fetchDogBreedList();

    let dropdown = document.getElementById("breed-dropdown");
    dropdown.value = ""; // initially clear the value of the dropdown
    dropdown.addEventListener("change", dropdownHandler);
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

let fetchDogBreedList = () => {
    let breeds = [];
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => {
        for (breed in json.message) {
            if (json.message[breed].length === 0) {
                breeds.push(breed);
            } else {
                for (breedPrefix of json.message[breed]) {
                    breeds.push(`${breedPrefix} ${breed}`);
                }
            }
        }
        renderDogBreedList(breeds);
    });
    return breeds;
}

let renderDogBreedList = breeds => {
    let breedListElement = document.getElementById("dog-breeds");
    breedListElement.textContent = ''; // MDN says textContent is faster than innerHTML, either way delete the children
    for (breed of breeds) {
        breedListElement.appendChild(getListItem(breed));
    }
}

let getListItem = string => {
    let li = document.createElement('li');
    li.innerText = string;
    li.addEventListener("click", event => {
        event.target.style.color = "blue";
    })

    return li;
}

let dropdownHandler = event => {
    renderDogBreedList(dogBreedList.filter(breed => {
        return breed[0] === event.target.value;
    }))
}


const dogBreedList = fetchDogBreedList();