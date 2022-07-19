'use strict';










//QUERY SELECTOR

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const ulResults = document.querySelector('.js-result-list');
const ulResultFavourites = document.querySelector('.js-result-favourites');




//VARIABLES GLOBALES

let animes = [];
let favourites = [];






//FUNCIONES


function renderFavouriteList(favourites){
  let html = '';
  for (const anime of favourites){
    const wrongImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    const placeholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=FAV-ANIME';

    html += `<li class="list--favourite" id="${anime.title}">`;
    if( anime.images.jpg.image_url === wrongImg){
      html+= `<img
          src=${placeholder}
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
    html +=`<p class="js-title favtitle">${anime.title}</p> <i class="js-icon fa-solid fa-circle-xmark icon" id=${anime.mal_id}></i>
    </li>`;
    html += `</li>`;
    
  }
  

  if(favourites === ''){
    ulResultFavourites.innerHTML = '';
  }else{
    ulResultFavourites.innerHTML = `<h2 class="h2">Series favoritas:<h2>${html}<button class= "delete js-delete">Borrar todos</button>`;

   const icons = document.querySelectorAll('.js-icon');
   const deleteBtn = document.querySelector('.js-delete');
   addListenerDeleteBtn(deleteBtn);
    addListenerIcons(icons);

  }}


function renderHTML(){
  let html ='';
  let classFavourite = '';

  for (const anime of animes) {
    const wrongImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
    const placeholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=ANIME';
    const favouriteFoundIndex = favourites.findIndex((fav) => anime.title === fav.title);
    if (favouriteFoundIndex !== -1){
      classFavourite = '--favourite';
      renderFavouriteList(favourites);

    }else{
      classFavourite = '';
    }
  
    html += `<li class="list${classFavourite} js-list-anime" id="${anime.title}">`;

    if( anime.images.jpg.image_url === wrongImg){
      html+= `<img
            src=${placeholder}
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

  if (html === ''){
    ulResults.innerHTML ='';
  }else{
    ulResults.innerHTML = `<h2 class="h2">Resultados:</h2><section class="container">${html}</section>`;
  }
        
  listenerAnime();
}
    
    
function getDataFromApi(){
  let inputValue = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      renderHTML();
    });
 
  listenerAnime();
}    
    
function setLs(favourites){
  localStorage.setItem('fav', JSON.stringify(favourites));
  renderHTML();
  listenerAnime();
}



//FUNCIONES DE EVENTO

function handleClick(ev) {
  ev.preventDefault();
  getDataFromApi();
}

function handleIconClick(event){

  const idSelected = parseInt(event.currentTarget.id);
  const iconClicked = favourites.find((favourite)=> favourite.mal_id===idSelected);
  const iconIndex = favourites.findIndex((fav)=> fav.mal_id ===idSelected);


  if(iconIndex !== -1){
    favourites.splice(iconClicked,1);
  }

  setLs(favourites);
  renderFavouriteList(favourites);
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

  
  setLs(favourites);
  renderFavouriteList(favourites);
}

function handleDeleteAll(event){
  event.preventDefault();
  favourites = [];
  setLs(favourites);
  renderFavouriteList(favourites);

}


function listenerAnime(){
  const liAnime = document.querySelectorAll('.js-list-anime');
  
  for (const anime of liAnime) {
    anime.addEventListener('click', handleFavouriteClick);
  }
}

function handleReset(ev){
  ev.preventDefault();
  ulResults.innerHTML = '';
}

function addListenerIcons(icons){
  for (const icon of icons) {
    icon.addEventListener('click', handleIconClick);
    
  }
}

function addListenerDeleteBtn(deleteBtn){
  deleteBtn.addEventListener('click', handleDeleteAll);
}

//FUNCION LOCAL STORAGE

function onLoad(){
  const dataLocalStorage = JSON.parse(localStorage.getItem('fav'));
  if(dataLocalStorage && dataLocalStorage.length > 0){
    favourites = dataLocalStorage;
    renderFavouriteList(favourites);

  }

}
onLoad();




//EVENTOS:
btnSearch.addEventListener('click', handleClick);
btnReset.addEventListener('click',handleReset);

