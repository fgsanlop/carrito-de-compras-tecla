const Purchase = require('../db/purchases');
const PurchaseDetail = require('../db/purchases.detail');
const Product = require('../db/products');

module.exports = class PurchaseModel {
    constructor(address, city, zipcode, method, total, products) {        
        this.address = address;
        this.city = city;
        this.zipcode = zipcode;
        this.method = method;
        this.total = total;
        this.products = products;
    }
    //C
    registrarCompra = async (idUsuario) => {
        try {
            let compraNueva = await Purchase.create({
                address: this.address,  
                city: this.city,
                zipcode: this.zipcode,
                method: this.method,
                total: this.total,
                user_id: idUsuario
            });

            this.products.forEach(async product => {

                let productARestarStock = await Product.findOne({
                    where: {
                        id: product.id
                    }
                });
                await PurchaseDetail.create({
                    price: product.price,
                    quantity: product.quantity,
                    subtotal: product.subtotal,
                    purchase_id: compraNueva.id,
                    product_title: productARestarStock.title
                });                
                productARestarStock.stock-=product.quantity;
                productARestarStock.sold+=product.quantity;                
                await productARestarStock.save();
            });

            return 'Compra realizada'
        } catch (err){
            throw new Error('No se pudo realizar la compra')
        }        
    }
    //R   
    static listarCompras = async (idUsuario) => {
        try {
            let compras = await Purchase.findAll({
                where: {
                    user_id: idUsuario
                },
                include: {
                    model: PurchaseDetail
                }
            });           
            if (compras.length == 0)
                throw new Error('No hay compras registradas');            
            return compras;
        } catch (error) {
            throw error;
        }
    }  
    
}