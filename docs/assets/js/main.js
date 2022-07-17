"use strict";const input=document.querySelector(".js-input"),btnSearch=document.querySelector(".js-btn-search"),btnReset=document.querySelector(".js-btn-reset"),animeTitleResultParagraph=document.querySelector(".js-title"),ulResults=document.querySelector(".js-result-list"),ulResultFavourites=document.querySelector(".js-result-favourites");let animes=[],favourites=[];function renderFavouriteList(e){let t="";for(const i of e){const e="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";t+=`<li class="list--favourite" id="${i.title}">`,i.images.jpg.image_url===e?t+='<img\n          src=https://via.placeholder.com/210x295/ffffff/666666/?text=FAV-ANIME\n          alt="img"\n          class="image js-img"/>':t+=`<img\n          src=${i.images.jpg.image_url}\n          alt="img"\n          class="image js-img"\n        />`,t+=`<p class="js-title">${i.title}</p>\n    </li>`,t+="</li>"}ulResultFavourites.innerHTML="<h2>Series favoritas:<h2>"+t,listenerAnime()}function renderHTML(){let e="",t="";for(const i of animes){const n="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";-1!==favourites.findIndex(e=>i.title===e.title)?(t="--favourite",renderFavouriteList(favourites)):t="",e+=`<li class="list${t} js-list-anime" id="${i.title}">`,i.images.jpg.image_url===n?e+='<img\n            src=https://via.placeholder.com/210x295/ffffff/666666/?text=ANIME\n            alt="img"\n            class="image js-img"/>':e+=`<img\n            src=${i.images.jpg.image_url}\n            alt="img"\n            class="image js-img"\n          />`,e+=`<p class="js-title">${i.title}</p>\n          </li>`,e+="</li>"}ulResults.innerHTML="<h2>Resultados:</h2>"+e,listenerAnime()}function getDataFromApi(){let e=input.value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{animes=e.data,console.log(animes)}),renderHTML(),listenerAnime()}function setLs(e){localStorage.setItem("fav",JSON.stringify(e)),renderHTML(),listenerAnime()}function handleClick(e){e.preventDefault(),getDataFromApi()}function handleFavouriteClick(e){const t=e.currentTarget.id;console.log("clique en"+e.currentTarget.id);const i=animes.find(e=>e.title===t),n=favourites.findIndex(e=>e.title===t);-1===n?favourites.push(i):favourites.splice(n,1),console.log(favourites),setLs(favourites)}function listenerAnime(){const e=document.querySelectorAll(".js-list-anime");for(const t of e)t.addEventListener("click",handleFavouriteClick)}function handleReset(e){e.preventDefault(),ulResults.innerHTML=""}function onLoad(){const e=JSON.parse(localStorage.getItem("fav"));e?(favourites=e,renderFavouriteList(favourites),console.log("Hay cosas en el LS")):getDataFromApi()}onLoad(),btnSearch.addEventListener("click",handleClick),btnReset.addEventListener("click",handleReset);