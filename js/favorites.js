
let removeFavFullScreen;
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));

// Favorites
function loadContentFav() {
    if(arrFav != null && arrFav != ""){
        for (var i = 0; i < arrFav.length; i++) {
            let img = document.createElement('img');
            img.setAttribute('id', `imgGIF${i}`);
            img.src = arrFav[i];

            let pUser = document.createElement('p');
            pUser.innerText = "User";
            pUser.setAttribute('class', 'pUser');
            let pTitle = document.createElement('p');
            /* pTitle.innerText = content.data[i].title; */
            pTitle.innerText = 'Titulo';
            pTitle.setAttribute('class', 'pTitle');

            // Icon Hover: Favorite 
            let imgFavorite = document.createElement('img');
            imgFavorite.setAttribute('id', `imgFav${i}`);
            imgFavorite.src = "./img/icon-fav-active.svg";
            imgFavorite.setAttribute('onclick', 'removeFavorites(this)');
            imgFavorite.setAttribute('class', 'icon imgFavorite');

            // Icon Hover: Download
            let imgDownload = document.createElement('img');
            imgDownload.setAttribute('id', `imgDow${i}`);
            imgDownload.src = "./img/icon-download.svg";
            imgDownload.setAttribute('onclick', 'download(this)');
            imgDownload.setAttribute('class', 'icon imgDownload');

            // Icon Hover: Full Screen
            let imgFullSize = document.createElement('img');
            imgFullSize.setAttribute('id', `imgFul${i}`);
            imgFullSize.src = "./img/icon-max.svg";
            imgFullSize.setAttribute('onclick', 'fullScreen(this)');
            imgFullSize.setAttribute('class', 'icon imgFullSize');

            let div = document.createElement('div');
            div.setAttribute('class', 'containerImg imgHover');
            div.setAttribute('id', `divGif${i}`);

            div.appendChild(img); 
            div.appendChild(imgFavorite); 
            div.appendChild(imgDownload); 
            div.appendChild(imgFullSize); 
            div.appendChild(pUser); 
            div.appendChild(pTitle); 

            let outImg = document.getElementById('outImgFav');
            outImg.appendChild(div);   
        }   
        document.getElementById('outImgFav').classList.remove('outImgFav');
        document.getElementById('buttonGeneralFavorites').classList.remove('buttonGeneralHidden');
    } else {
        noHaveContent();
    }
}

function noHaveContent(){
    console.log('Favoritos no tienes imagenes agregadas');
    document.getElementById('saveFirstGifo').classList = 'saveFirstGifoVisible';
    document.getElementById('outImgFav').classList.toggle('outImgFav');
    document.getElementById('buttonGeneralFavorites').classList.toggle('buttonGeneralHidden');
}

function clearFavorites(){
    localStorage.clear();
    location.reload();
}

function removeFavorites(imageFavorites) {
    let idImgHtml = imageFavorites.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    arrFav.splice(extractLastDigit, 1);
    localStorage.removeItem('sendFavorites');
    localStorage.setItem('sendFavorites', JSON.stringify(arrFav));
    location.reload();

}

//Download
async function download(imageFavorites) {
    let idImgHtml = imageFavorites.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    let tagGIF = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let a = document.createElement('a');
    let response = await fetch(tagGIF);
    let file = await response.blob();
    a.download = imageFavorites.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

// FullScreen
function fullScreen(iconFullScreen) {
    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    auxExtractLastDigitSearch = extractLastDigit;
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;
    removeFavFullScreen = extractLastDigit ;
    let imgClose = document.createElement('img');
    imgClose.src = './img/close.svg';
    imgClose.classList.add('styleClose'); 
    imgClose.setAttribute('onclick', 'closeFullScreen()');

    // Container
    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');
    divImgDirection.appendChild(imgFullScreen);
    
    // Title - User
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGif${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;

    //div title - user
    let divText = document.createElement('div');
    divText.classList.add('styleDivText')

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    let imgFavorite = document.createElement('img');
    imgFavorite.src = "./img/icon-fav-active.svg";
    imgFavorite.setAttribute('onclick', 'removeFavoritesFullScreen(this)');
    imgFavorite.setAttribute('class', 'icon imgFavorite');

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

function closeFullScreen() {
    document.getElementById('divFullScreen').innerHTML = "";
    document.getElementById('divFullScreen').classList.add('hidden');
    document.getElementById('divFullScreen').classList.remove('styleFullScreen');
}

function removeFavoritesFullScreen() {
    arrFav.splice(removeFavFullScreen, 1);
    localStorage.removeItem('sendFavorites');
    localStorage.setItem('sendFavorites', JSON.stringify(arrFav));
    location.reload();

}