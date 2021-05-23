const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const Role = sequelize.define("roles", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },    
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, {timestamps: false});

module.exports = Role;