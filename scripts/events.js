import { searchProduct } from "../app/services/seach_service.js"
import { STORE } from "../app/store.js"
import Main from "./main.js"

function  inputChangeEvent (e, context) {
    e.preventDefault()
    const valueChange = e.target.value
    context.currentQuery = valueChange
    STORE.currentQuery = valueChange
    context.currentPage = 1
    STORE.currentPage = 1
    context.currentCategory = 0
    STORE.currentCategory = 0
    if (valueChange) {
        let idDebounce
        if (idDebounce) {
            clearTimeout(idDebounce)
        }
        idDebounce = setTimeout(async () => {
            context.query = true
            STORE.query = true
            STORE.currentProducts = await searchProduct(valueChange)
            context.render()
        }, 300)
    }
    else {
        context.query = false;
        STORE.query = false;
        context.render()
    }
}

function  buttonClickEvent (e, context) {
    e.preventDefault();
    context.query = false
    STORE.query = false
    context.currentQuery = ""
    STORE.currentQuery = ""
    context.currentPage = 1
    STORE.currentPage = 1
    context.render()
}

function selectChangeEvent (e,context){
    STORE.currentCategory = e.target.value
    STORE.currentPagina = 1
    context.renderProducts()
}


function filterChangeEvent(e,context){
    STORE.currentFilter = e.target.value
    context.renderProducts()
}

function paginationClickEvent (e,context) {
    const movePage = e.target.textContent
    STORE.currentPage = movePage
    context.pagina = movePage
    const main = Main(".container-js")
    main.render()
}



export {inputChangeEvent, buttonClickEvent , selectChangeEvent, filterChangeEvent , paginationClickEvent}