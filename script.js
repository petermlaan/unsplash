const ACCESS_KEY = "";
const BASE_URL = "https://api.unsplash.com/";

const hSearch = document.querySelector("#btnSearch");
hSearch.addEventListener("click", onSearch);
const hNextPage = document.querySelector("#btnNextPage");
hNextPage.addEventListener("click", onNextPage);
const hPrevPage = document.querySelector("#btnPrevPage");
hPrevPage.addEventListener("click", onPrevPage);

let gQuery = "";
let gPage = 1;

async function onSearch(e) {
    e.preventDefault();
    gPage = 1;
    const hForm = document.querySelector("#frmSearch");
    if (!hForm.reportValidity())
        return;
    const hQuery = document.querySelector("#txtQuery");
    gQuery = hQuery.value;
    getImages();
}

async function onNextPage(e) {
    e.preventDefault();
    if (gQuery.length > 0) {
        gPage++;
        getImages();
    }
}

async function onPrevPage(e) {
    e.preventDefault();
    if (gPage > 1 && gQuery.length > 0) {
        gPage--;
        getImages();
    }
}

async function getImages() {
    try {
        const hPerPage = document.querySelector("#selPerPage");
        const perPage = hPerPage.value;
        const url = BASE_URL + `search/photos?query=${gQuery}&page=${gPage}&per_page=${perPage}&client_id=${ACCESS_KEY}`;
        console.log(url);
        const images = await fetchJSON(url);
        console.log(images);
        const hImages = document.querySelector("#secImages");
        hImages.innerHTML = "";
        for (const image of images.results) {
            const hImage = document.createElement("img");
            hImage.classList.add("image");
            hImage.src = image.urls.small;
            hImages.appendChild(hImage);
        }
    }
    catch (e) {
        console.error(e);
    }
}

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(response);
    const data = await response.json();
    return data;
}