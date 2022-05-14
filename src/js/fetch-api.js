import axios from "axios"
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
                safesearch: false,
                page: this.page,
                per_page: 20,
            }
            })
            
            const responseUrl = await getUrl.data; 
            const objResp = await responseUrl.hits;
            if (responseUrl.hits.length===0) {
                return Notify.warning(`We're sorry, but you've reached the end of search results.`)
            }
            Notify.info(`total: ${responseUrl.totalHits}`)
            
            return objResp
            
        } catch (error) {
            Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)

        }

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