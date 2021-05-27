const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const Product = sequelize.define('product', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
})