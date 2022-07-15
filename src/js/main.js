'use strict';

const { off } = require("gulp");

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





function handleClick(ev) {
    ev.preventDefault();
    let inputValue = input.value;
    console.log(inputValue);

    fetch('https://api.jikan.moe/v4/anime?q=')
    
    .then((response) => response.json())
    .then((data) => {
        animes = data.data;
        console.log(animes);

        
        ulResults.innerHTML = `<img
        src="https://via.placeholder.com/200x300.jpg"
        alt="placeholder"
        class="js-img"
      />
      <p class="js-title">Titulo del anime</p>
    </li>`;


    });
    

}

btnSearch.addEventListener('click', handleClick);