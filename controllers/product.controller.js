const fetch = require('node-fetch');
const ProductModel = require('../models/product.model');

const listarTendencias = async () => {
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

const registrarProducto = async (data) => {
    const { category_id, title, description, price, picture, stock } = data;
    let nuevoProducto = new ProductModel(category_id, title, description, price, picture, stock);    
    try {
        let res = await nuevoProducto.registrarProducto();
        return res;
    } catch (error) {
        throw error;
    }    
}

const listarProductos = async () => {
    try {
        return await ProductModel.listarProductos();
    } catch (error) {
        throw error;
    }
}

const listarProductosPorBusqueda = async (palabra) => {
    try {
        return await ProductModel.listarProductosPorBusqueda(palabra);
    } catch (error) {
        throw error;
    }
}

const listarProductosPorCategoria = async (categoria) => {
    try {
        return await ProductModel.listarProductosPorCategoria(categoria);
    } catch (error) {
        throw error;
    }
}

const listarProducto = async (id) => {
    try {
        return await ProductModel.listarProducto(id);
    } catch (error) {
        throw error;
    }
}

const modificarProducto = async (id, data) => {
    const { category_id, title, description, price, picture, stock } = data;
    let modProducto = new ProductModel(category_id, title, description, price, picture, stock);
    try {        
        let res = await modProducto.modificarProducto(id);
        return res;
    } catch (error) {
        throw error;
    }
}

const eliminarProducto = async (id) => {  
    try {        
        let res = await ProductModel.eliminarProducto(id);
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registrarProducto,
    listarProducto,
    listarProductos,
    listarProductosPorBusqueda,
    listarProductosPorCategoria,
    listarTendencias,
    modificarProducto,
    eliminarProducto
}