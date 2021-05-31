import Api from './api.js';

const api = new Api();
const url = 'http://localhost:3000/api';


const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

let tokenAdmin = getCookie('tokenAdmin')        
let myHeaders = new Headers();
myHeaders.append('Authorization', `Bearer ${tokenAdmin}`);
myHeaders.append('Content-Type', 'application/json');


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

    eliminarProducto = async () => {                    
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        let req = await fetch(`${url}/product/delete/${this.id}`, requestOptions);
        let resultado = await req.json();

        if(resultado.hasOwnProperty('error'))
            return false;
        else
            return true;
    }

    modificarProducto = async () => {

        let modificacion = JSON.stringify({
            category_id: this.category_id,
            title: this.title,
            description: this.description,
            price: this.price,
            picture: this.picture,
            stock: this.stock
        });

        let requestOptions = {
            method: 'PUT',
            body: modificacion,
            headers: myHeaders
        };

        let req = await fetch(`${url}/product/update/${this.id}`, requestOptions);
        let resultado = await req.json();
        console.log(resultado);

        if(resultado.hasOwnProperty('error'))
            return resultado.error;
        else
            return 'ok';
    }

    crearProducto = async () => {
        let crear = JSON.stringify({
            category_id: this.category_id,
            title: this.title,
            description: this.description,
            price: this.price,
            picture: this.picture,
            stock: this.stock
        });

        let requestOptions = {
            method: 'POST',
            body: crear,
            headers: myHeaders
        };

        let req = await fetch(`${url}/product/register`, requestOptions);
        let resultado = await req.json();

        if(resultado.hasOwnProperty('error'))
            return false;
        else
            return true;
    }
}