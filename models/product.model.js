
const Product = require('../db/product');
const sequelize = require('../db/conn');

    module.exports = class Product {
    constructor(id, categoryId, title, description, price, updated, picture, stock, sold) {
        this.id = id; 
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.price = price;
        if (updated === null) 
            this.update = '';
        else
            this.updated = new Date(updated).toLocaleString();
        this.picture = picture;
        this.stock = stock;
        this.sold = sold;
    
    }
}
module.exports.listaProductos = async () => {
    try {
    let list = await Product.list()
    return list
    }catch (err) {
        throw new Error ({error: err.message})
    }
}

    module.exports.nuevoProducto = async (req,res) => {
        try {
           Product.create({where: {productos: req.id, categoriaID:req.categoryId,
                titulo: req.title,descripcion: req.description,precio: req.price,actualizar: req.update
                ,imagen: req.picture, existencia: req.stock,venta: req.sold
                .then(result =>{
                    res.status(200).json(result);
                })
                
            }})

        } catch (error) {
            res.status(500).json({
                message: "Fail!",
                error: error.message
            })
        }
        
    }
    //R

    consultaProducto = async () => {
        try {
            await Product.update({where: {productos: req.id, categoriaID:req.categoryId,
                titulo: req.title,descripcion: req.description,precio: req.price,actualizar: req.update
                ,imagen: req.picture, existencia: req.stock,venta: req.sold
                .then(result =>{
                    res.status(200).json(result);
                })
                
            }})

        } catch (error) {
            res.status(500).json({
                message: "Error!",
                error: error
            })
        } 
    }
 
    modificarProducto = async (dato) => {
        try {
     await Product.update({where: {productos: dato.id, categoriaID: dato.categoryId,
        titulo: dato.title,descripcion: dato.description,precio: dato.price,actualizar: dato.update
        ,imagen: dato.picture, existencia: dato.stock,venta: dato.sold
      } })
      return true;
    }catch (error) {
      throw new Error ('Error no se pudo actualizar el producto')      
        }
    }
 
    eliminarProducto = async (req,res) => {
        try {
            let productoID = req.id;
            let producto = await Producto.findByPK(productoID);
            if(!producto){
                res.status(404).json({
                    message: "no existe producto con id = " + productoID,
                    error: "404",
                });
            } else {
                await producto.destroy();
                res.status(200);
                return true;
            }
        } catch (error) {
            res.status(500).json({
                message: "Error -> no se puede eliminar id = " + req.id,
                error: error.message
        });
    }

}