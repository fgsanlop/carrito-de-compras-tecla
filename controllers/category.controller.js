const CategoryModel = require('../models/category.model');

const listarCategorias = async () => {
    try {        
        let res = await CategoryModel.obtenerCategorias();
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = { listarCategorias }