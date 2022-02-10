export default function renderProducts(parentElement=".main-js", products) {
  const default_img = "https://asiaebuy.com/img/default.jpg"
    return {
        parent: document.querySelector(parentElement),
        products: products,
        render: function () {
            let html = `
                <div class="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                ${this.products.map((product) => {
                return (
                    `
                    <div class="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
    <img class="object-contain h-48 w-96" src="${product.url_image || default_img}" alt="" />
    <div class="badge absolute top-0 right-0 bg-indigo-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">-$ ${product.discount}</div>
    <div class="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
      <span class="mr-1 p-1 px-2 font-bold border-l border-gray-400">$ ${product.price}</span>
    </div>
    <div class="desc p-4 text-gray-800">
      <span class="description text-sm block py-2 border-gray-400 mb-2">${product.name}</span>
    </div>
  </div>`)
            }).join(" ")}
            
                </div>
                <div class="pagination-js"></div>
            `;
            this.parent.innerHTML = html;
        }
    }
}