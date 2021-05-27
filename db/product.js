const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const Product = sequelize.define('product', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    updated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Product;
module.exports.list = async() =>{
    let result = await sequelize.query('SELECT * FROM ')
    return result[0]

}

module.exports.listProduct = async (dato) => {
    let result = await Product.findAll({
        where: { id : dato }
    })
    return result[0]
}
