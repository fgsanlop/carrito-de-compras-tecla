const fetch = require('node-fetch');
const Product = require('../models/product.model');

const obtenerTendencias = async () => {
    try {
        let res = await fetch('https://api.mercadolibre.com/trends/MLM/MLM1144');        
        let json = await res.json();
        if(!json)
            throw new Error('Error en petición o datos vacios');
        else {
            let trends = new Array();
            json.forEach(element => {
                trends.push(element.keyword);
            });
            return trends; 
        }
        
    } catch(error){
        throw error;
    }
}

const buscarProducto = async (id) => {
    try {
        let res = await fetch('https://api.mercadolibre.com/items/' + id);
        let json1 = await res.json();        

        if(json1.hasOwnProperty('error'))
            throw new Error('Producto no encontrado');

        let descripcion = await fetch('https://api.mercadolibre.com/items/' + id + '/descriptions');
        let json2 = await descripcion.json();
        
        let productObj = new Product(
            json1.id,
            json1.category_id,
            json1.title,
            json2[0].plain_text,
            json1.price,
            json1.last_updated,            
            json1.pictures[0].url,
            json1.available_quantity,
            json1.sold_quantity
        );

        return productObj;
        
    } catch(error) {
        throw error;
    }
}

const buscarProductos = async (palabra) => {
    try {
        let res = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM1144&q=' + palabra);        
        let json = await res.json();

        if(json.results.length == 0)
            throw new Error('No hay productos para tu busqueda');
        else {
            let products = new Array();
            json.results.forEach(element => {
                let product = new Product(
                    element.id,
                    element.category_id,
                    element.title,
                    '',
                    element.price,
                    '',
                    element.thumbnail,
                    element.available_quantity,
                    element.sold_quantity
                );
                products.push(product);                
            });
            return products;
        }
    } catch(error){
        throw error;
    }
}

const buscarProductosPorCategoria = async (categoria) => {
    try {
        let res = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=' + categoria);        
        let json = await res.json();

        if(json.results.length == 0)
            throw new Error('No hay productos para tu busqueda');
        else {
            let products = new Array();
            json.results.forEach(element => {
                let product = new Product(
                    element.id,
                    element.category_id,
                    element.title,
                    '',
                    element.price,
                    '',
                    element.thumbnail,
                    element.available_quantity,
                    element.sold_quantity
                );
                products.push(product);                
            });
            return products;
        }

    } catch(error){
        throw error;
    }
}

module.exports = { 
    buscarProductos, 
    buscarProductosPorCategoria, 
    buscarProducto, 
    obtenerTendencias 
};