// import '../css/homework-11.css'
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/homework-11.css'
import API from './fetch-api'
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix';

console.log('hello')

const formEl = document.querySelector('#search-form')
const loadBtn = document.querySelector('.load-more')
const divEl = document.querySelector('.gallery')
const apiService = new API();

const lightbox=new SimpleLightbox('.gallery a', {
        
        animationSpeed: 250,
        loop: true,
        enableKeyboard: true,
        preloading: true,
        docClose: true,
        captionsData: 'alt',
        }
);

formEl.addEventListener('submit', onFormSubmit)
loadBtn.addEventListener('click', onLoadMore)

function onFormSubmit(e) {
    e.preventDefault()

    divEl.innerHTML=''
    apiService.resetPage()
    apiService.query = e.currentTarget.elements.searchQuery.value
    if (apiService.query==='') {
        return Notify.warning(`add some name`)
    }
    console.log(apiService)

    getRender()
    
}

function createCardMarkap(markap) {
    return markap.map(cardTpl).join('')
}

function onRender(card) {
    
    divEl.insertAdjacentHTML('beforeend', card)  
    lightbox.refresh()
}

function onLoadMore() {
    apiService.incrimentPage()
    getRender()
}

function getRender() {
    const render=apiService.onFetch()
        .then(onRender)
        return render
}


  
 