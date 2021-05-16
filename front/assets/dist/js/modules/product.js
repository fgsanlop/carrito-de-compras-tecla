import Api from './api.js';
const api = new Api();

export default class Product {
    constructor(id) {
        this.id = id;
        this.title = '';
        this.price = 0;
        this.currency_id = '';
        this.updated = '';
        this.description = '';
        this.quantity = 0;
        this.pictures = new Array();
    }

    mapearProducto = async () => {
        let res = await api.buscarProducto(this.id);        

        if(!res.hasOwnProperty('error')) {
            this.title = res.title;
            this.price = res.price;
            this.currency_id = res.currency_id;
            this.updated = res.last_updated;
            this.description = res.description;
            res.pictures.forEach(element => {
                this.pictures.push(element.url);
            });
        }
        else
            this.id = 0;
        
    }
}