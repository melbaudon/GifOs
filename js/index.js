const APIKEY = "QK6UsrjD01bi101WQLtb91EdShkInSIk";

//Burguer Menu
let navBar = document.getElementById('navBar');
navBar.addEventListener('click', () => {
    navBarClose.classList.remove('hidden');
    navBar.classList.add('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});
let navBarClose = document.getElementById('navBarClose');
navBarClose.addEventListener('click', () => {
    navBarClose.classList.add('hidden');
    navBar.classList.remove('hidden');
    document.getElementById('ulNavBar').classList.toggle('active')
});

//Theme dark -light
const btnTheme = document.querySelector('#theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "MODO NOCTURNO") {
        btnTheme.innerText = "MODO DIURNO";
        modeTheme = 1;
        ImgDarkTheme();
    } else {
        btnTheme.innerText = "MODO NOCTURNO";
        modeTheme = 0;
        ImgLightTheme();
    }
// Set theme mode
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

// Get theme mode
var modeThemeResponse = JSON.parse(localStorage.getItem('sendTheme'));

// Dark Theme - Light Theme
let logo = document.getElementById('logo');
let burger = document.getElementById('navBar');
let closeNav = document.getElementById('navBarClose');
let camara = document.getElementById('camara');
let movie = document.getElementById('movie');
let btnSearch = document.getElementById('imgBtnSearch');
let btnBack = document.getElementById('btnBack');
let imgCloseSearch = document.getElementById('imgCloseSearch');

function ImgDarkTheme() {
    logo.src = "./img/Logo-modo-noc.svg";
    burger.src = "./img/burger-modo-noct.svg";
    closeNav.src = "./img/close-modo-noct.svg";
    if(camara != null && movie != null ) {
    camara.src = "./img/camara-modo-noc.svg";
    movie.src = "./img/pelicula-modo-noc.svg";
    }
    if(btnSearch != null) {
        btnSearch.src = "./img/icon-search-mod-noc.svg";
        imgCloseSearch.src = "./img/close-modo-noct.svg"
    }
}

function ImgLightTheme() {
    logo.src = "./img/logo-desktop.svg";
    burger.src = "./img/burger.svg";
    closeNav.src = "./img/button-close.svg";
    if(camara != null && movie != null) {
    camara.src = "./img/camara.svg";
    movie.src = "./img/pelicula.svg";    
    }
    if(btnSearch != null) {
        btnSearch.src = "./img/icon-search.svg"
        imgCloseSearch.src = "./img/button-close.svg"
    }
}

// Keep theme to change page
if(modeThemeResponse == 1){
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "MODO DIURNO";
    ImgDarkTheme();
} else{
    ImgLightTheme();
}

// Download FullScreen
async function downloadFullScreen(e) {
    let imgFullScreen = document.getElementById('imgFullScreen').src;
    let a = document.createElement('a');
    let response = await fetch(imgFullScreen);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

// Add Favorites
var arrayFavorites = [];  
var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
 if (arrFav != null) {
    arrayFavorites = arrFav;
} 
 
function addFavoritesFullScreen(iconFavorite) {
    let imgFullScreen = document.getElementById('imgFullScreen').src;
    arrayFavorites.push(imgFullScreen);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}



