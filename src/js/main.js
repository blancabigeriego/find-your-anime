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
    
    html += `<li class="list--favourite js-list-anime" id="${anime.title}">`;
    html+= `<img
    src=${anime.images.jpg.image_url}
    alt="img"
    class="image js-img"
    />`;
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

      const favouriteFoundIndex = favourites.findIndex((fav) => anime.title === fav.title);
      if (favouriteFoundIndex !== -1){
        classFavourite = '--favourite';
        renderFavouriteList();

      }else{
        classFavourite = '';
      }
           
            html += `<li class="list${classFavourite} js-list-anime" id="${anime.title}">`;
            html+= `<img
            src=${anime.images.jpg.image_url}
            alt="img"
            class="image js-img"
          />`;
          html +=`<p class="js-title">${anime.title}</p>
          </li>`;
          html += `</li>`;
        }

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
  localStorage.setItem('fav', JSON.stringify(favourites));
  renderHTML();
  listenerAnime();
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
    console.log('Hay cosas en el LS');
    favourites = dataLocalStorage;
    renderFavouriteList(dataLocalStorage);

  }else{
    getDataFromApi();
  }
}
onLoad();
btnSearch.addEventListener('click', handleClick);
