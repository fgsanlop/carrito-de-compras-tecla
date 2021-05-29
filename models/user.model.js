const User = require('../db/users');
const sequelize = require('../db/conn');

module.exports = class UserModel {
    constructor(email, pass, name, last_name) {        
        this.email = email;
        this.pass = pass;
        this.name = name;
        this.last_name = last_name;
    }
    //C
    registrarUsuario = async () => {
        let existeUsuario = await this.checarExistenciaUsuario();
        if(existeUsuario)
            throw new Error('Usuario ya ha sido registrado');
        else {
            try {
                await User.create({
                    role_id: 1,  
                    email: this.email, 
                    pass: this.pass, 
                    name: this.name, 
                    last_name: this.last_name
                });
                return 'Usuario creado'
            } catch (err){
                throw new Error('No se pudo registrar usuario')
            }
        }
    }
    //R
    checarExistenciaUsuario = async () => {
        let existeUsuario = await User.findOne({
            where: {email: this.email} 
        });
        if (existeUsuario === null)
            return false
        else 
            return true        
    }
    comprobarCredenciales = async () => {
        let existeUsuario = await User.findOne({
            where: {
                email: this.email, 
                pass: this.pass
            } 
        });

        if (existeUsuario === null)
            return false
        else 
            return existeUsuario    
    }
    //U
    modificarUsuario = async (id) => {        
        try {
            let usuarioAModificar = await User.findOne({
                where: {id: id}
            });
            if(usuarioAModificar !== null){
                usuarioAModificar.pass = this.pass;
                usuarioAModificar.name = this.name;
                usuarioAModificar.last_name = this.last_name;
                await usuarioAModificar.save();
                return 'Usuario modificado';
            }
            else
                throw new Error('No existe usuario');
        } catch (error) {
            throw Error('Error al modificar usuario');
        }
        /*await User.update({
            pass: this.pass,
            name: this.name,
            last_name: this.last_name
        },
        {
            where: {id: id}
        });*/
        
    }
    //D
    static eliminarUsuario = async (id) => {
        let usuarioAEliminar = await User.findOne({
            where: {id: id}
        });
        try {
            if(usuarioAEliminar === null)
                throw new Error('Usuario no existe o ya ha sido eliminado')
            else {
                await usuarioAEliminar.destroy();
                return 'Usuario eliminado'
            }                
        } catch (error) {
            throw error
        }
    }
    
}