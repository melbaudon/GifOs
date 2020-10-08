//Variables
let countStartTrending = 0;
let countEndTrending = 3;
let arrayTrendingSrc = [];
let arrayTrendingtitle = [];
let auxExtractLastDigit = 0;

document.addEventListener("DOMContentLoaded", initTrending);

function initTrending() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=50`;
    fetch(url).then(response => response.json()).then(content => {
            for (var i = 0; i < 50; i++) {
                arrayTrendingSrc.push(content.data[i].images.original.url);
                arrayTrendingtitle.push(content.data[i].title);
            }
            createImgTrending();
        })
        .catch(err => {
            console.error(err);
        });
}

function createImgTrending() {
    if (arrayTrendingSrc != "" && arrayTrendingtitle != "") {
        try {
            for (var i = countStartTrending; i < countEndTrending; i++) {
                
                let img = document.createElement('img');
                img.setAttribute('id', `imgTren${i}`);
                img.src = arrayTrendingSrc[i];
                img.alt = arrayTrendingtitle[i];

                let pUser = document.createElement('p');
                pUser.innerText = "User";
                pUser.setAttribute('class', 'pUser');
                let pTitle = document.createElement('p');
                pTitle.innerText = arrayTrendingtitle[i];
                pTitle.setAttribute('class', 'pTitle');

                // Icon Hover: Favorite 
                let imgFavorite = document.createElement('img');
                imgFavorite.setAttribute('id', `imgFavT${i}`);
                imgFavorite.src = "./img/icon-fav-hover.svg";
                imgFavorite.setAttribute('onclick', 'addFavoritesTrending(this)');
                imgFavorite.setAttribute('class', 'icon imgFavorite');

                // Icon Hover: Download
                let imgDownload = document.createElement('img');
                imgDownload.setAttribute('id', `imgDowT${i}`);
                imgDownload.src = "./img/icon-download.svg";
                imgDownload.setAttribute('onclick', 'downloadTrending(this)');
                imgDownload.setAttribute('class', 'icon imgDownload');

                // Icon Hover: Full Size
                let imgFullSize = document.createElement('img');
                imgFullSize.setAttribute('id', `imgFulT${i}`);
                imgFullSize.src = "./img/icon-max.svg";
                imgFullSize.setAttribute('onclick', 'fullSize(this)');
                imgFullSize.setAttribute('class', 'icon imgFullSize');

                //Container
                let div = document.createElement('div');
                div.setAttribute('class', 'containerImg imgHover');
                div.setAttribute('id', `divGifT${i}`);

                div.appendChild(img); 
                div.appendChild(imgFavorite); 
                div.appendChild(imgDownload); 
                div.appendChild(imgFullSize); 
                div.appendChild(pUser); 
                div.appendChild(pTitle); 

                // Section
                let out = document.getElementById('sectionTrending');
                out.appendChild(div);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('No hay GIF para la palabra buscada: ' + document.getElementById('search').value);
    }
}

// Arrows: next - back 
document.getElementById("btnNext").addEventListener('click', nextGIF);
document.getElementById("btnBack").addEventListener('click', backGIF);

function nextGIF() {
    if (countStartTrending < 47 && countEndTrending < 50) {
        countStartTrending++;
        countEndTrending++;
        document.getElementById('sectionTrending').innerText = "";
        createImgTrending();
    } else {
        console.log('Esta posicionado en la ultima imagen.')
    }
}

function backGIF() {
    if (countStartTrending == 0 && countEndTrending == 3) {
        console.log('Esta posicionado en la primer imagen.')
    } else {
        countStartTrending--;
        countEndTrending--;
        document.getElementById('sectionTrending').innerText = "";
        createImgTrending();
    }
}

// Add Favorites
var arrayFavorites = [];
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
if (arrFav != null) {
    arrayFavorites = arrFav;
}
function addFavoritesTrending(iconFavorite) {
    let idImgHtml = iconFavorite.id;
    let extractLastDigit = idImgHtml.slice(7, idImgHtml.length);
    let tagGif = document.getElementById(`imgTren${extractLastDigit}`);
    arrayFavorites.push(tagGif.src);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
    location.reload();
}

// Download Gif
async function downloadTrending(e) {
    let idImgFullScreen = e.id;
    let extractLastDigit = idImgFullScreen.slice(7, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgTren${extractLastDigit}`).src;
    let a = document.createElement('a');
    let response = await fetch(imgFullScreenSrc);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

// Full Screen 
function fullSize(iconFullScreen) {
    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(7, idImgFullScreen.length);
    auxExtractLastDigit = extractLastDigit;
    let imgFullScreenSrc = document.getElementById(`imgTren${extractLastDigit}`).src;

    let imgClose = document.createElement('img');
    imgClose.src = './img/close.svg';
    imgClose.classList.add('styleClose');
    imgClose.setAttribute('onclick', 'closeFullScreenTrending()');

    // Container Image - Arrows: left - right
    let btnBack = document.createElement('img');
    btnBack.src = './img/button-left.svg';
    btnBack.setAttribute('class', 'btnBack');
    btnBack.setAttribute('onclick', 'backGIFFullSize()');

    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    let btnNext = document.createElement('img');
    btnNext.src = './img/button-right.svg';
    btnNext.setAttribute('class', 'btnNext');
    btnNext.setAttribute('onclick', 'nextGIFFullSize()');

    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');

    divImgDirection.appendChild(btnBack);
    divImgDirection.appendChild(imgFullScreen);
    divImgDirection.appendChild(btnNext);

    // Title - user
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGifT${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;
    pTitle.setAttribute('id', `pTitleTrending`);

    //div title - user
    let divText = document.createElement('div');
    divText.classList.add('styleDivText');

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    // Icon Favorite 
    let imgFavorite = document.createElement('img');
    imgFavorite.src = "./img/icon-fav-hover.svg";
    imgFavorite.setAttribute('onclick', 'addFavoritesFullScreen(this)');
    imgFavorite.setAttribute('class', 'icon imgFavorite');

    // Icon Download
    let imgDownload = document.createElement('img');
    imgDownload.src = "./img/icon-download.svg";
    imgDownload.setAttribute('onclick', 'downloadFullScreen(this)');
    imgDownload.setAttribute('class', 'icon imgDownload');

    let divDescription = document.createElement('div');
    divDescription.classList.add('styleDivDescription');

    divDescription.appendChild(divText);
    divDescription.appendChild(imgFavorite);
    divDescription.appendChild(imgDownload);

    // Container
    let divFullScreen = document.getElementById('divFullScreen');
    divFullScreen.classList.add('styleFullScreen');
    divFullScreen.classList.remove('hidden');

    divFullScreen.appendChild(imgClose);
    divFullScreen.appendChild(divImgDirection);
    divFullScreen.appendChild(divDescription);
    document.querySelector('body').appendChild(divFullScreen);
}

function closeFullScreenTrending() {
    document.getElementById('divFullScreen').innerHTML = "";
    document.getElementById('divFullScreen').classList.add('hidden');
    document.getElementById('divFullScreen').classList.remove('styleFullScreen');
}

function nextGIFFullSize() {
    let imgFullScreen = document.getElementById(`imgFullScreen`);
    let pTitle = document.getElementById(`pTitleTrending`);
    auxExtractLastDigit++;
    if (auxExtractLastDigit >= 0 && auxExtractLastDigit < arrayTrendingSrc.length) {
        imgFullScreen.src = arrayTrendingSrc[auxExtractLastDigit];
        pTitle.innerText = arrayTrendingtitle[auxExtractLastDigit];
    }
}

function backGIFFullSize() {
    let imgFullScreen = document.getElementById(`imgFullScreen`);
    let pTitle = document.getElementById(`pTitleTrending`);
    auxExtractLastDigit--;
    if (auxExtractLastDigit >= 0 && auxExtractLastDigit < arrayTrendingSrc.length) {
        imgFullScreen.src = arrayTrendingSrc[auxExtractLastDigit];
        pTitle.innerText = arrayTrendingtitle[auxExtractLastDigit];
    }
}

