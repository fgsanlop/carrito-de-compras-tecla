const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./conn');
const Product = require('./products');
const Purchase = require('./purchases');

const PurchaseDetail = sequelize.define('purchases_details', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false,        
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false,
    },
});

let relationshipPurchase = {
    foreignKey: {
        name: 'purchase_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};


Purchase.hasMany(PurchaseDetail, relationshipPurchase);
PurchaseDetail.belongsTo(Purchase, relationshipPurchase);

/*
NO LA CONSIDERE AL FINAL PORQUE LAS COMPRAS PERMANCEN A PESAR DE QUE UN PRODUCTO SE ELIMINE
Product.hasMany(PurchaseDetail, relationshipProduct);
PurchaseDetail.belongsTo(Product, relationshipProduct);
*/

module.exports = PurchaseDetail;