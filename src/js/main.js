'use strict';



console.log('>> Ready :)');

//QUERY SELECTOR

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const img = document.querySelector('.js-img');
const animeTitleResultParagraph = document.querySelector('.js-title');
const ulResults = document.querySelector('.js-result-list');

//VARIABLES GLOBALES

let animes = [];




//FUNCIONES



    
function renderHTML(){
    let html = '';

    for (const anime of animes) {
            html+= `<img
            src=${anime.images.jpg.image_url}
            alt="img"
            class="js-img"
          />`
          html +=`<p class="js-title">${anime.title}</p>
          </li>`
        };

        ulResults.innerHTML = html;
      ;
    }
    
    
    fetch('https://api.jikan.moe/v4/anime?q=')
    
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        animes = data.data;
        console.log(animes);
        


    });
    


//FUNCIONES DE EVENTO

function handleClick(ev) {
    ev.preventDefault();
    let inputValue = input.value;
    console.log(inputValue);
    renderHTML();

}

btnSearch.addEventListener('click', handleClick);
