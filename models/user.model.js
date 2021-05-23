const User = require('../db/users');
const sequelize = require('../db/conn');

module.exports = class User {
    constructor() {
        /*
        id
        role_id
        email
        pass
        name
        last_name
        last_login
        */
    }

    //C
    registrarUsuario = async () => {}
    //R
    checarExistenciaUsuario = async () => {
        let existe = await User.findOne({
            where: {
                email: this.email, 
                pass: this.pass
            } 
        });

        if (existe === null)
            return false
        else 
            return true        
    }
    //U
    modificarUsuario = async () => {}
    //D
    eliminarUsuario = async () => {}
    
}