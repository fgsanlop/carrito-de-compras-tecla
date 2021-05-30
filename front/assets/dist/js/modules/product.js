import Api from './api.js';
const api = new Api();

export default class Product {
    constructor(id) {
        this.id = id; 
        this.category_id = '';
        this.title = '';
        this.description = '';
        this.price = 0;
        this.picture = '';
        this.stock = 0;
        this.sold = 0;
        this.updatedAt = null;
    }

    mapearProducto = async () => {
        let res = await api.buscarProducto(this.id);   
        const { id, category_id, title, description, price, picture, stock, sold, updatedAt } = res;     

        if(!res.hasOwnProperty('error')) {
            this.id = id; 
            this.category_id = category_id;
            this.title = title;
            this.description = description;
            this.price = price;
            this.picture = picture;
            this.stock = stock;
            this.sold = sold;
            let utcDate = new Date(updatedAt)
            this.updatedAt = utcDate.toLocaleString();
        }
        else
            this.id = 0;        
    }
}