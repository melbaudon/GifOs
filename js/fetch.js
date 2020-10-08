//Variables
let countSeeMore = 12;
let countID = 0;
let auxExtractLastDigitSearch = 0;

document.getElementById("btnSearch").addEventListener("click", init);
document.getElementById("btnSeeMore").addEventListener("click", seeMore);
document.getElementById("search").addEventListener('keyup', onKeyUp);
document.getElementById('btnClose').addEventListener('click', clearSuggest);
document.getElementById('search').addEventListener('keyup', suggestSearch);

// Search Gifs
function init() {
    document.getElementById('noFound').classList.remove('styleNoFound');
    document.getElementById('noFound').classList.add('hidden');

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=0&q=`;
    let str = document.getElementById("search").value;
    url = url.concat(str);
    fetch(url).then(response => response.json()).then(content => {
            if (content.data != "") {
                try {
                    document.getElementById('sectionSearch').classList.remove('hidden');
                    document.getElementById('searchIndex').innerText = "";
                    document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;
                    createImgSearch(content, countID);
                    document.getElementById("btnSearch").disabled = true;
                } catch (error) {
                    console.log(error);
                }
            } else {
                showMessageNoFound();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// Images Gifs
function createImgSearch(content, countID) {
    for (var i = 0; i < 12; i++) {
        let img = document.createElement('img');
        img.setAttribute('id', `imgGIF${countID}`);
        img.src = content.data[i].images.original.url;
        img.alt = content.data[i].title;

        let pUser = document.createElement('p');
        pUser.innerText = "User";
        pUser.setAttribute('class', 'pUser');
        let pTitle = document.createElement('p');
        pTitle.innerText = content.data[i].title;
        pTitle.setAttribute('class', 'pTitle');

        // Icon Hover: Favorite 
        let imgFavorite = document.createElement('img');
        imgFavorite.setAttribute('id', `imgFav${countID}`);
        imgFavorite.src = "./img/icon-fav-hover.svg";
        imgFavorite.setAttribute('onclick', 'addFavorites(this)');
        imgFavorite.setAttribute('class', 'icon imgFavorite');

        // Icon Hover: Download 
        let imgDownload = document.createElement('img');
        imgDownload.setAttribute('id', `imgDow${countID}`);
        imgDownload.src = "./img/icon-download.svg";
        imgDownload.setAttribute('onclick', 'download(this)');
        imgDownload.setAttribute('class', 'icon imgDownload');

        // Icon Hover: FullScreen
        let imgFullSize = document.createElement('img');
        imgFullSize.setAttribute('id', `imgFul${countID}`);
        imgFullSize.src = "./img/icon-max.svg";
        imgFullSize.setAttribute('onclick', 'fullScreenFecth(this)');
        imgFullSize.setAttribute('class', 'icon imgFullSize');

        let div = document.createElement('div');
        div.setAttribute('class', 'containerImg imgHover');
        div.setAttribute('id', `divGif${countID}`);

        div.appendChild(img); 
        div.appendChild(imgFavorite); 
        div.appendChild(imgDownload); 
        div.appendChild(imgFullSize); 
        div.appendChild(pUser); 
        div.appendChild(pTitle); 

        let out = document.getElementById('searchIndex');
        out.appendChild(div);

        countID++;
    }
}

// Button See More
function seeMore() {
    document.getElementById('noFound').classList.remove('styleNoFound');
    document.getElementById('noFound').classList.add('hidden');

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&offset=${countSeeMore}&q=`;
    let str = document.getElementById("search").value;
    url = url.concat(str);
    countSeeMore += 12;

    fetch(url).then(response => response.json()).then(content => {
            if (content.data != "") {
                try {
                    document.getElementById('sectionSearch').style.display = 'block';
                    document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;
                    countID += 12;
                    createImgSearch(content, countID);
                } catch (error) {
                    console.log('No hay más imagenes');
                    console.log(error);
                }
            } else {
                console.log('No hay GIF para la palabra buscada: ' + document.getElementById('search').value);
                showMessageNoFound();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// Button search
document.getElementById("search").addEventListener('change', inputChange => {
    document.getElementById("btnSearch").disabled = false;
});

// Enter Key - Search
function onKeyUp(event) {
    var keycode = event.keyCode;
    if (keycode == '13') {
        document.getElementById('searchIndex').innerText = "";
        countSeeMore = 12;
        init();
    }
}

// Search not found
function showMessageNoFound(){
    document.getElementById('sectionSearch').classList.remove('hidden'); 
    let divNoFound = document.getElementById('noFound');
    divNoFound.classList.remove('hidden');
    divNoFound.classList.add('styleNoFound');
    document.getElementById('noFoundH2').innerText = document.getElementById('search').value;
    document.getElementById('sectionSearch').classList.add('hidden');
}

//Suggest
document.getElementById('search').addEventListener('keyup', suggestSearch);
function suggestSearch (){
let keyword = document.getElementById('search').value;
    if(keyword){
const endpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&q=${keyword}`; 

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
                var ulSearch = document.getElementById('ulSearch');
                ulSearch.innerHTML = "";
                ulSearch.classList.add('ulShow');

               for(i=0; i < 4; i++){
                let li = document.createElement('li');
                li.innerText = data.data[i].name;
                li.setAttribute('onclick', 'completeInput(this)' )
                ulSearch.appendChild(li);
               }

               document.getElementById('btnClose').classList.remove('btnCloseHidden');
               let containerInpImg = document.getElementById('containerInpImg');
               containerInpImg.classList.add('orderInpImg');
               
               document.getElementById('subtitleTrending').classList.add('hidden');
               document.getElementById('descriptionTrending').classList.add('hidden');
               document.getElementById('sectionMain').classList.add('hiddenTitleImg')
               
        })
        .catch (e => {console.log('sugerencia no existe')});
    }else{
        clearSuggest();
    }
}

function completeInput(valueLi) {
    let inputSearch = document.getElementById('search');
    inputSearch.value = valueLi.innerText;
 
    init();
    clearSuggest(false);
}

// Clear suggestions
function clearSuggest(clear = true) {
    ulSearch.innerHTML = "";
    ulSearch.classList.remove('ulShow');
    document.getElementById('search').value = clear ? "" : document.getElementById('search').value;
    document.getElementById('containerInpImg').classList.remove('orderInpImg');
    document.getElementById('btnClose').classList.add('btnCloseHidden');
    document.getElementById('subtitleTrending').classList.remove('hidden');
    document.getElementById('descriptionTrending').classList.remove('hidden');
    document.getElementById('noFound').classList.add('hidden');
    document.getElementById('noFound').classList.remove('styleNoFound');
    document.getElementById('sectionMain').classList.remove('hiddenTitleImg');
   /*  document.getElementById('sectionSearch').classList.remove('hidden'); */
}

document.getElementById('btnClose').addEventListener('click', clearSuggest);

// Add Favorites
var arrayFavorites = [];
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
if(arrFav != null){
    arrayFavorites = arrFav;
}

function addFavorites(iconFavorite) {
    let idImgHtml = iconFavorite.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    let tagGif = document.getElementById(`imgGIF${extractLastDigit}`);
    arrayFavorites.push(tagGif.src);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}

// FullScreen
function fullScreenFecth(iconFullScreen) {

    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    auxExtractLastDigitSearch = extractLastDigit;
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let imgClose = document.createElement('img');
    imgClose.src = './img/close.svg';
    imgClose.classList.add('styleClose'); 
    imgClose.setAttribute('onclick', 'closeFullScreen()');

    // Container Image - Arrows: left - right
    let btnBack = document.createElement('img');
    btnBack.src = './img/button-left.svg';
    btnBack.setAttribute('class', 'btnBack');
    btnBack.setAttribute('onclick', 'backGifFullScreen()');

    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    let btnNext = document.createElement('img');
    btnNext.src = './img/button-right.svg';
    btnNext.setAttribute('class', 'btnNext');
    btnNext.setAttribute('onclick', 'nextGifFullScreen()');


    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');

    divImgDirection.appendChild(btnBack);
    divImgDirection.appendChild(imgFullScreen);
    divImgDirection.appendChild(btnNext);

    // Title - user
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

function closeFullScreen() {
    document.getElementById('divFullScreen').innerHTML = "";
    document.getElementById('divFullScreen').classList.add('hidden');
    document.getElementById('divFullScreen').classList.remove('styleFullScreen');
}

// Download Gif
async function download(e) {
    let idImgFullScreen = e.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;
    let a = document.createElement('a');
    let response = await fetch(imgFullScreenSrc);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

// Arrows
function backOrNextGif() {
    let imgNextGif = document.getElementById(`imgGIF${auxExtractLastDigitSearch}`);
    let getTitle = document.getElementById(`divGif${auxExtractLastDigitSearch}`);
    if (getTitle) {
        let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;
        let imgFullScreen = document.getElementById(`imgFullScreen`);
        let getTitleFullScreen = document.getElementsByClassName(`styleDivText`)[0];
        let pTitle = getTitleFullScreen.getElementsByTagName(`p`)[1];
        if (imgNextGif != null) {
            imgFullScreen.src = imgNextGif.src;
            pTitle.innerText = sendTitle;
        }
    } else {
        console.log('No hay más imagenes')
        auxExtractLastDigitSearch = 0;
    }
}

function nextGifFullScreen() {
    auxExtractLastDigitSearch++;
    backOrNextGif();
}

function backGifFullScreen() {
    auxExtractLastDigitSearch--;
    backOrNextGif();

}



