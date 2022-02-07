const STORE = {
    products: [],
    categories:[]
  };
  
  STORE.products = JSON.parse(localStorage.getItem("items")) || [];
  STORE.categories = JSON.parse(localStorage.getItem("items")) || [];
  
  export { STORE };
