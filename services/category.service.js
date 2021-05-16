const fetch = require('node-fetch');
const Category = require('../classes/category');

const obtenerCatergorias = async () => {
    try {
        let res = await fetch('https://api.mercadolibre.com/categories/MLM1144');
        let json = await res.json();

        let categories = new Array();

        json.children_categories.forEach(element => {
            let categoryObj = new Category(element.id, element.name);
            categories.push(categoryObj);            
        });

        return categories;
        
    } catch(error) {
        throw new Error('Error de servidor (MercadoLibre)');
    }
}

module.exports = { obtenerCatergorias }