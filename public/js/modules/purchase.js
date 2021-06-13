import { getCookie } from './cookies.js';

let token = getCookie('token')        
let myHeaders = new Headers();
myHeaders.append('Authorization', `Bearer ${token}`);
myHeaders.append('Content-Type', 'application/json');

export default class Purchases {
    constructor(address, city, zipcode, method, products) {        
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
        this.method = method;
        this.total = 0;
        this.products = products; 
        this.link = 'http://localhost:3000/api/user';  
    }

    registrarCompra = async () => {
        this.products.forEach(element => {
            this.total += element.subtotal;
        });
        let crear = JSON.stringify({
            address: this.address,
            city: this.city,
            zipcode: this.zipcode,
            method: this.method,
            total: this.total,
            products: this.products
        });

        console.log(crear)

        let requestOptions = {
            method: 'POST',
            body: crear,
            headers: myHeaders
        };

        let req = await fetch(`${this.link}/purchase/new`, requestOptions);
        return await req.json();
    }

    static listarCompras = async () => {        
        let requestOptions = {            
            headers: myHeaders
        };        
        let req = await fetch(`http://localhost:3000/api/user/purchases`, requestOptions);
        return await req.json();
    }

}