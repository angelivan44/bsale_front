import { STORE } from "../app/store.js";
import { paginationClickEvent } from "./events.js";

export default function pagination(parentElement, elements) {
    const numerPages = Math.ceil(elements / 8)
    const arrayDates = Array.from({ length: numerPages }, (x, i) => i)
    return {
        parent: document.querySelector(parentElement),
        pagina: STORE.currentPage,

        render: function () {
            let html = `
                    <div class="flex flex-col items-center my-12">
                    <div class="flex text-gray-700">
        
                     <div class="flex h-12 font-medium rounded-full bg-gray-200">
            ${arrayDates.map((ele) => {
                return `<div class=" pag-js w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full ${(ele + 1) == parseInt(this.pagina) ? "bg-teal-600 text-white" : ""}">${ele + 1}</div>`
            }).join(" ")}
                        </div>
                    </div>
                    </div>
      `;
            this.parent.innerHTML = html;
            this.addListenerPagination()
        },

        addListenerPagination: function () {
            const elements = document.querySelectorAll(".pag-js")
            elements.forEach((element) => {
                element.addEventListener("click", (e) => paginationClickEvent(e,this))
            })
        },

    }

}