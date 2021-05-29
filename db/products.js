const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
         }
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,        
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(14,2),
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Product;