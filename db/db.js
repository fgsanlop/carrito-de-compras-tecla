const fetch = require('node-fetch');

const obtenerTendencias = async () => {
    try {
        let res = await fetch('https://api.mercadolibre.com/trends/MLM/MLM1144');        
        let json = await res.json();

        if(!json)
            throw new Error('Error en petición o datos vacios');

        return json;
    } catch(error){
        throw error;
    }
}

const buscarProductos = async (palabra) => {
    try {
        let res = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM1144&q=' + palabra);        
        let json = await res.json();

        if(json.results.length == 0)
            throw new Error('No hay productos para tu busqueda');

        return json.results;
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

        json1['description'] = json2[0].plain_text;

        return json1;
        
    } catch(error) {
        throw error;
    }
}

const obtenerCatergorias = async () => {
    try {
        let res = await fetch('https://api.mercadolibre.com/categories/MLM1144');
        let json = await res.json();

        return json.children_categories;
        
    } catch(error) {
        throw new Error('Error de servidor (MercadoLibre)');
    }
}

const buscarProductosPorCategoria = async (categoria) => {
    try {
        let res = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=' + categoria);        
        let json = await res.json();

        if(json.results.length == 0)
            throw new Error('No hay productos para tu busqueda');
        return json.results;

    } catch(error){
        throw error;
    }
}

module.exports = { 
    buscarProductos, 
    buscarProductosPorCategoria, 
    buscarProducto, 
    obtenerCatergorias, 
    obtenerTendencias 
};