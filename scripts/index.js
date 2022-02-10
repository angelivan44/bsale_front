import { listCategories } from "../app/services/categories_service.js"
import { listProducts } from "../app/services/products_service.js"
import { STORE } from "../app/store.js"
import Main from "./main.js"

async function init(){
    STORE.products = await listProducts()
    STORE.categories = await listCategories()
    const main = Main(".container-js")
    main.render()
}

init()