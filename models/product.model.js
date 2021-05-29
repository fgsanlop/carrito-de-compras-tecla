const Product = require('../db/products');
const sequelize = require('../db/conn');
const { QueryTypes } = require('sequelize');
const { listarProducto } = require('../controllers/product.controller');

module.exports = class ProductModel {
    constructor(category_id, title, description, price, picture, stock) {                
        this.category_id = category_id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.picture = picture;
        this.stock = stock;        
    }
    //C
    registrarProducto = async () => {        
        try {
            await Product.create({
                category_id: this.category_id,
                title: this.title,
                description: this.description,
                price: this.price,
                picture: this.picture,
                stock: this.stock,
                sold: 0
            });
            return 'Producto creado'
        } catch (err){
            throw new Error('No se pudo registrar el producto')
        }        
    }
    //R
    static listarProductos = async () => {
        let productos = await Product.findAll();
        if (productos === null)
            throw Error('No hay productos en inventario')
        else 
            return productos
    }

    static listarProductosPorBusqueda = async (palabra) => {
        let productosPorBusqueda = await sequelize.query('SELECT * FROM products WHERE title LIKE :search_name',
            {
              replacements: { search_name: `%${palabra}%` },
              type: QueryTypes.SELECT
            }
        );
        if (productosPorBusqueda === null)
            throw Error('No hay resultados para tu busqueda')
        else 
            return productosPorBusqueda
    }
    
    static listarProductosPorCategoria = async (categoria) => {
        let productosPorCategoria = await Product.findAll({ 
            where: {
                category_id: categoria
            }
        });
        if (productosPorCategoria === null)
            throw Error('No hay productos en esta categoría')
        else 
            return productosPorCategoria
    }
    
    static listarProducto = async (id) => {
        let producto = await Product.findOne({ 
            where: {
                id: id
            }
        });
        if (producto === null)
            throw new Error('Este producto no existe')
        else 
            return producto
    }
    //U
    modificarProducto = async (id) => {
        let productoAModificar = await Product.findOne({ 
            where: {
                id: id
            }
        });
        if (productoAModificar == null)
            throw new Error('Este producto no existe')        
        try {
            productoAModificar.category_id = this.category_id;
            productoAModificar.title = this.title;
            productoAModificar.description = this.description;
            productoAModificar.price = this.price;
            productoAModificar.stock = this.stock;
            await productoAModificar.save();
            return 'Producto modificado';                        
        } catch (error) {
            throw Error('Error al modificar producto');
        }
    }
    //D
    static eliminarProducto = async (id) => {
        let producto = await this.listarProducto(id);
        await producto.destroy();
        return 'Producto eliminado'
    }
    
}