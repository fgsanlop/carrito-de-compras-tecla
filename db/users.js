const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('./conn');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
         }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,        
        validate: {
            isEmail:true
        },
        unique: {
            args: true,
            msg: 'Correo electrónico ya registrado'
        }
    },
    pass: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
});

//User.belongsTo(Role);

module.exports = User;