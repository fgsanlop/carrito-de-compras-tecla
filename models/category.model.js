const Category = require('../db/categories');

module.exports = class CategoryModel {
    static obtenerCategorias = async () => {
        try {
            let categorias = await Category.findAll();
            return categorias
        } catch (error) {
            throw new Error('Error al listar categorias')
        }
    }
}