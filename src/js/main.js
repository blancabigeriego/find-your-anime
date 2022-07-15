'use strict';

console.log('>> Ready :)');

//QUERY SELECTOR
const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');


function handleClick(ev) {
    ev.preventDefault();
    let inputValue = input.value;
    console.log(inputValue);

}

btnSearch.addEventListener('click', handleClick);