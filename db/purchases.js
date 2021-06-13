const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('./conn');
const User = require('./users');

const Purchase = sequelize.define('purchases', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: false,        
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false,
    }
    //Por algunos proyectos y creo que por logica, 
    //no se registra el numero de tarjeta ni datos bancarios del cliente,
    //por esa razon no considere esto para la tabla
});

let relationship = {
    foreignKey: {
        name: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
};

User.hasMany(Purchase, relationship);
Purchase.belongsTo(User, relationship)

module.exports = Purchase;