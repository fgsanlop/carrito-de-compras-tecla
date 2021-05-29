const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const Categorie = sequelize.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },    
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
}, {timestamps: false});

module.exports = Categorie;