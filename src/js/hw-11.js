// import '../css/homework-11.css'
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/homework-11.css'
import cardTpl from '../templates/cards-markap.hbs'
import API from './fetch-api'
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix';

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
    getRender()
}

async function getRender() {
    try {
        const getApi = await apiService.onFetch()
        const getData = await getApi.hits
        console.log(getApi)
        if (getData.length===0) {
           return Notify.warning('nothing')
        }
        Notify.info(`total ${getApi.totalHits}`)
        const objHits = await createCardMarkap(getData)
        const render = await onRender(objHits)
        return render
       
        
    } catch {
        onError()
    }

}

function createCardMarkap(markap) {
    return markap.map(el => cardTpl(el)).join('');
}

function onRender(card) {
    divEl.insertAdjacentHTML('beforeend', card)  
    lightbox.refresh()
}

function onLoadMore() {
    apiService.incrimentPage()
    getRender()
}

function onError() {
    Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
}



  
 