import axios from "axios"
import cardTpl from '../templates/cards-markap.hbs'
import { Notify } from "notiflix"


const URL = 'https://pixabay.com/api/'
const USER_KEY = '27123547-e3d6f14ef2ba40deb7ec3615d'

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async onFetch() {

        try {
            const getUrl= await axios.get(URL, {
            params: {
                key: USER_KEY,
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 20,
            }
            })
            
            const responseUrl = await getUrl.data; 
            const objResp = await responseUrl.hits;
            
            const render = await this.createCardMarkap(objResp)
            return render
            
        } catch (error) {
            Notify.failure(`Ошибка`)
            // console.log(error.message)
        }
        //         return axios.get(URL, {
        //     params: {
        //         key: USER_KEY,
        //         q: this.searchQuery,
        //         image_type: 'photo',
        //         orientation: 'horizontal',
        //         safesearch: true,
        //         page: this.page,
        //         per_page: 20,
        //     }
        // })
        //     .then(response => response.data)
        //     .then(obj => {
        //         console.log(obj)
        //         console.log(obj.totalHits)
        //         Notify.info(`total hits: ${obj.totalHits}`)
        //         return obj.hits
        //     })
        //             .then(this.createCardMarkap)

    }

    createCardMarkap(markap) {
    return markap.map(cardTpl).join('')
   
    }
    
    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery=newQuery
    }

    incrimentPage() {
        this.page += 1;
    }

    resetPage() {
        this.page=1
    }

}