import axios from "axios"

const URL = 'https://pixabay.com/api/'
const USER_KEY = '27123547-e3d6f14ef2ba40deb7ec3615d'

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    onFetch() {
            return axios.get(URL, {
            params: {
                key: USER_KEY,
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: false,
                page: this.page,
                per_page: 30,
            }
            })
                .then(r => r.data)
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