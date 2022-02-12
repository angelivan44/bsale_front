import { searchProduct } from "../app/services/seach_service.js";
import { STORE } from "../app/store.js";
import { buttonClickEvent, filterChangeEvent, inputChangeEvent, selectChangeEvent } from "./events.js";
import pagination from "./pagination.js";
import renderProducts from "./products.js";

export default function Main(parentElement) {
    return {
        parent: document.querySelector(parentElement),
        rendProd: renderProducts,
        rendPagination: pagination,
        query: STORE.query,
        currentQuery: STORE.currentQuery,
        store: STORE,
        render: function () {
            let html = `
            <nav class="flex w-screen justify-center items-center  gap-20  " >
            <img class="object-cover h-20 w-40" src="https://dojiw2m9tvv09.cloudfront.net/16738/2/logobsale-open-graph8239.jpg">
        <select id="select-js" class="form-select appearance-none block px-3 h-10 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
        <option selected value="0">select a category</option>
            ${STORE.categories.map((ele) => `<option value="${ele.id}">${ele.name}</option>`).join(" ")}
        </select>

        <select id="filter-js" class="form-select appearance-none block px-3  py-1.5  h-10  text-base font-normal text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300
        rounded  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <option ${this.store.currentFilter == "0" ? "selected" : ""} value="0"> A-Z </option>
            <option ${this.store.currentFilter == "1" ? "selected" : ""}  value="1">Precio</option>
            <option ${this.store.currentFilter == "2" ? "selected" : ""}  value="2">Descuento</option>
            <option ${this.store.currentFilter == "3" ? "selected" : ""}  value="3">Categoria</option>

        </select>

        <div class="flex gap-8 form-js">
            <div class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input type="text" value="${this.currentQuery}" name="input" class="input-js input border h-10 border-gray-400 appearance-none rounded w-full px-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600">
            </div>
            <button class="icon button-js flex items-center justify-center w-full gap-2" name = "button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          <p class="text-xs">refresh</p>
            </button>
        </div>
    </nav>
    <main class="main-js"><main>
            `;
            this.parent.innerHTML = ""
            this.parent.innerHTML = html;
            this.addSelecterlistener()
            this.addListenerQuery()
            this.renderProducts()
        },

        addSelecterlistener: function () {
            const selectCatergory = document.querySelector("#select-js")
            const selectFilter = document.querySelector("#filter-js")
            selectCatergory.addEventListener("change", (e) => selectChangeEvent(e,this))

            selectFilter.addEventListener("change", (e) => filterChangeEvent(e,this))
        },

        renderProducts: function () {
            let dataInit
            if (!this.query) {
                dataInit = this.filterData(this.store.products, this.store.currentCategory)
            } else {
                dataInit = this.filterData(this.store.currentProducts, this.store.currentCategory)
            }
            const sortedInit = this.sortProducts(dataInit, this.store.currentFilter, this.store.currentPagina)
            const renProducts = this.rendProd(".main-js", sortedInit)
            renProducts.render()
            const renPagination = this.rendPagination(".pagination-js", dataInit.length, this.store.currentPagina)
            renPagination.render()
        },

        filterData: function (data, category) {
            let filterData = []
            if (category != "0") {
                filterData = data.filter((ele) => ele.category == category)
            }
            else {
                filterData = data
            }
            return filterData
        },

        sortProducts: function (data, filter, pagination) {
            let pag = parseInt(pagination)
            let filterData = []
            switch (filter) {
                case "0":
                    filterData = data.sort((a, b) => a.name > b.name && 1 || -1)
                    break;
                case "1":
                    filterData = data.sort((a, b) => a.price - b.price)
                    break;
                case "2":
                    filterData = data.sort((a, b) => a.discount - b.discount)
                    break;
                case "3":
                    filterData = data.sort((a, b) => a.category - b.category)
                    break;
                default:
                    filterData = data.sort()
            }
            return filterData.slice((pag - 1) * 8, pag * 8)
        },
        addListenerQuery: function () {
            const input = document.querySelector(".input-js")
            const button = document.querySelector(".button-js")
            button.addEventListener("click", (e) => buttonClickEvent(e,this))
            input.addEventListener("change", (e)=>inputChangeEvent(e,this))
        }
    }
}