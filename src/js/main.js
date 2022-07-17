'use strict';








//QUERY SELECTOR

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const img = document.querySelector('.js-img');
const animeTitleResultParagraph = document.querySelector('.js-title');
const ulResults = document.querySelector('.js-result-list');
const ulResultFavourites = document.querySelector('.js-result-favourites');

//VARIABLES GLOBALES

let animes = [];
let favourites = [];





//FUNCIONES


function renderFavouriteList(){
  let html = '';
  for (const anime of favourites){
    const wrongImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

    html += `<li class="list--favourite js-list-anime" id="${anime.title}">`;
    if( anime.images.jpg.image_url === wrongImg){
      html+= `<img
          src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=FAV-ANIME'}
          alt="img"
          class="image js-img"/>`;
    }
    else {
      html+= `<img
          src=${anime.images.jpg.image_url}
          alt="img"
          class="image js-img"
        />`;
    }
    html +=`<p class="js-title">${anime.title}</p>
    </li>`;
    html += `</li>`;
  }
  ulResultFavourites.innerHTML = `<h2>Series favoritas:<h2>${html}`;
  listenerAnime();

}


function renderHTML(){
  let html ='';
  let classFavourite = '';

  for (const anime of animes) {
    const wrongImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    const favouriteFoundIndex = favourites.findIndex((fav) => anime.title === fav.title);
    if (favouriteFoundIndex !== -1){
      classFavourite = '--favourite';
      renderFavouriteList();

    }else{
      classFavourite = '';
    }

    html += `<li class="list${classFavourite} js-list-anime" id="${anime.title}">`;

    if( anime.images.jpg.image_url === wrongImg){
      html+= `<img
            src=${'https://via.placeholder.com/210x295/ffffff/666666/?text=ANIME'}
            alt="img"
            class="image js-img"/>`;
    }
    else {
      html+= `<img
            src=${anime.images.jpg.image_url}
            alt="img"
            class="image js-img"
          />`;
    }
           
            
    html +=`<p class="js-title">${anime.title}</p>
          </li>`;
    html += `</li>`;}

  listenerAnime();
  ulResults.innerHTML = `<h2>Resultados:</h2>${html}`;
        
  listenerAnime();
}
    
    
function getDataFromApi(){
  let inputValue = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      console.log(animes);
    });
  renderHTML();
  listenerAnime();
}    
    
function setLs(){
  localStorage.setItem('fav', JSON.stringify(favourites));
  renderHTML();
  listenerAnime();
}

//FUNCIONES DE EVENTO

function handleClick(ev) {
    ev.preventDefault();
    getDataFromApi();
}



function handleFavouriteClick(event){
  
  const idSelected = event.currentTarget.id;
  const animeFound = animes.find((anime)=> anime.title === idSelected);
  const favouriteFound = favourites.findIndex((fav)=> fav.title === idSelected);
  if(favouriteFound === -1){
    favourites.push(animeFound);
} else {
    favourites.splice(favouriteFound, 1);
  }

  console.log(favourites);
  setLs();
}


function listenerAnime(){
  const liAnime = document.querySelectorAll('.js-list-anime');
  for (const anime of liAnime) {
    anime.addEventListener('click', handleFavouriteClick);
  }
}

//FUNCION LOCAL STORAGE

function onLoad(){
  const dataLocalStorage = JSON.parse(localStorage.getItem('fav'));
  if(dataLocalStorage){
    favourites = dataLocalStorage;
    renderFavouriteList(dataLocalStorage);
    console.log('Hay cosas en el LS');


  }else{
    getDataFromApi();
  }
}
onLoad();




//EVENTOS:
btnSearch.addEventListener('click', handleClick);
