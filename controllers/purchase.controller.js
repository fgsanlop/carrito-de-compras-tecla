const PurchaseModel = require('../models/purchase.model');

const registrarCompra = async (data, idUsuario) => {
    const { address, city, zipcode, method, total, products } = data;
    let nuevaCompra = new PurchaseModel(address, city, zipcode, method, total, products);    
    try {
        let res = await nuevaCompra.registrarCompra(idUsuario);
        return res;
    } catch (error) {
        throw error;
    }    
}

const listarCompras = async (idUsuario) => {
    try {
        let res = await PurchaseModel.listarCompras(idUsuario);
        return res;
    } catch (error) {
        throw error;
    }    
}

module.exports = {
    registrarCompra,
    listarCompras
}