import throttle from "lodash.throttle"

const form = document.querySelector('form')

form.addEventListener('submit', onSubmit)
form.addEventListener('input', throttle(onInputForm, 500))

populateValue()

function onInputForm(e) {
    //записывает значения в локальное хранилище
    localStorage.setItem(e.target.name, e.target.value)
    
}

function populateValue() {
    // берет значения из локального хранилища если они там есть
    //  и прописывает их в инпуты после перезагрузки
    const emailVal = localStorage.getItem('email')
    const messagelVal = localStorage.getItem('message')
    if (emailVal||messagelVal) {
        form.elements.email.value=emailVal
        form.elements.message.value=messagelVal
    }

}


function onSubmit(e) {
    e.preventDefault()

    const formObj = {}
    // создает объект и записывает в них значения полей которые были при отправке формы
    formObj.email = form.elements.email.value;
    formObj.mesaage = form.elements.message.value;

    // Удаляет значения хранилища и инпутов после отправки формы 
    e.currentTarget.reset()
    localStorage.removeItem('email')
    localStorage.removeItem('message')

    // Если форма пустая то не консолит объект
    if (formObj.email!=='' && formObj.mesaage!=='') {
        console.log(formObj)
    } 
    
}


