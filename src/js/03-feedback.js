import throttle from "lodash.throttle"

const form = document.querySelector('form')
form.addEventListener('submit', onSubmit)
form.addEventListener('input', throttle(onInputForm, 500))

const formObj = {}
const KEY_STORAGE='feedback-form-state'


populateTextArea()

function onInputForm(e) {
    //записывает значения в локальное хранилище
    formObj[e.target.name]=e.target.value
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formObj))   
    
}

function populateTextArea() {
    // берет значения из локального хранилища если они там есть
    //  и прописывает их в инпуты после перезагрузки
    const dataVal = localStorage.getItem(KEY_STORAGE)

    if (dataVal) {
        const dataPars = JSON.parse(dataVal)
        form.email.value=dataPars.email
        form.message.value = dataPars.message
        
    }

}


function onSubmit(e) {
    e.preventDefault()
    // Если форма пустая то не консолит объект
    if (form.email.value!=='' && form.message.value!=='') {
        console.log(formObj)

        e.currentTarget.reset()
        localStorage.removeItem(KEY_STORAGE)
    }
    
    
}


