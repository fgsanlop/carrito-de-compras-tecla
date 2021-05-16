import Api from './api.js';
const api = new Api();

export default class Product {
    constructor(id) {
        this.id = id; 
        this.categoryId = '';
        this.title = '';
        this.description = '';
        this.price = 0;
        this.updated = '';
        this.picture = '';
        this.stock = 0;
        this.sold = 0;
    }

    mapearProducto = async () => {
        let res = await api.buscarProducto(this.id);   
        const { id, categoryId, title, description, price, updated, picture, stock, sold } = res;     

        if(!res.hasOwnProperty('error')) {
            this.id = id; 
            this.categoryId = categoryId;
            this.title = title;
            this.description = description;
            this.price = price;
            this.updated = updated;
            this.picture = picture;
            this.stock = stock;
            this.sold = sold;
        }
        else
            this.id = 0;
        
    }
}