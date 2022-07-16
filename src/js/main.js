'use strict';






//QUERY SELECTOR

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const img = document.querySelector('.js-img');
const animeTitleResultParagraph = document.querySelector('.js-title');
const ulResults = document.querySelector('.js-result-list');


//VARIABLES GLOBALES

let animes = [];
let favourites = [];




//FUNCIONES



    
function renderHTML(){
    let html = '';

    for (const anime of animes) {
            html += `<li class= "list js-list-anime" id="${anime.title}">`;
            html+= `<img
            src=${anime.images.jpg.image_url}
            alt="img"
            class="image js-img"
          />`;
          html +=`<p class="js-title">${anime.title}</p>
          </li>`;
          html += `</li>`;
        };

        ulResults.innerHTML = html;
        listenerAnime();
      ;
    }
    
    
    
    


//FUNCIONES DE EVENTO

function handleClick(ev) {
    ev.preventDefault();
    let inputValue = input.value;
    

    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    
    .then((response) => response.json())
    .then((data) => {
        
        
        animes = data.data;
        
        console.log(animes);
        


    });
    renderHTML();

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
  

  

}


function listenerAnime(){
  const liAnime = document.querySelectorAll('.js-list-anime');
  for (const anime of liAnime) {
    anime.addEventListener('click', handleFavouriteClick);
  }
}





btnSearch.addEventListener('click', handleClick);
