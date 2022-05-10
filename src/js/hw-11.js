// import '../css/homework-11.css'
import 'simplelightbox/dist/simple-lightbox.min.css';

import '../css/homework-11.css'
// import '../css/common.css'
// import cardTpl from './templates/cards-markap.hbs'
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios'
// import debounce from 'lodash.debounce';
import API from './fetch-api'
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix';

console.log('hello')
// console.log(cardTpl)


const formEl = document.querySelector('#search-form')
const loadBtn = document.querySelector('.load-more')
const divEl = document.querySelector('.gallery')
const apiService = new API();


formEl.addEventListener('submit', onFormSubmit)
loadBtn.addEventListener('click', onLoadMore)
// divEl.addEventListener('click', openLightBox)

function onFormSubmit(e) {
    e.preventDefault()
    divEl.innerHTML=''
    apiService.resetPage()
    apiService.query = e.currentTarget.elements.searchQuery.value
    if (apiService.query==='') {
        return Notify.warning(`add some name`)
    }
    console.log(apiService)
    // apiService.onFetch()
    //     .then(onRender)
        getRender().then(openLightBox)
    
}

function createCardMarkap(markap) {
    return markap.map(cardTpl).join('')
}

function onRender(card) {
    divEl.insertAdjacentHTML('beforeend', card)  
}

function onLoadMore() {
    apiService.incrimentPage()
    // apiService.onFetch()
    //     .then(onRender)
    getRender()
}

function getRender() {
    const render=apiService.onFetch()
        .then(onRender)
    
    return render
}






function openLightBox() {
    // e.preventDefault()
   new SimpleLightbox('.gallery a', {
        
        animationSpeed: 250,
        loop: true,
        enableKeyboard: true,
        preloading: true,
        docClose: true,
        captionsData: 'alt',
        }
   );

}

  
 