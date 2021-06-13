const User = require('../db/users');

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
    static obtenerDatos = async (id) => {
        try {
            let usuario = await User.findOne({
                where: {
                    id: id
                },
                attributes: ['email', 'name', 'last_name', 'updatedAt']
            });
            if(usuario == null)
                throw new Error('No existe usuario');

            return usuario;
        } catch (error) {
            throw error;
        }
    } 
    checarExistenciaUsuario = async () => {
        let existeUsuario = await User.findOne({
            where: {email: this.email} 
        });
        if (existeUsuario === null)
            return false
        else 
            return true        
    }
    comprobarCredenciales = async (role) => {
        let existeUsuario = await User.findOne({
            where: {
                role_id: role,
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
    modificarUsuario = async (id, newPass) => {        
        try {
            let usuarioAModificar = await User.findOne({
                where: {
                    id: id,
                    pass: this.pass
                }
            });
            if(usuarioAModificar !== null){
                usuarioAModificar.pass = newPass;
                usuarioAModificar.name = this.name;
                usuarioAModificar.last_name = this.last_name;
                await usuarioAModificar.save();
                return 'Usuario modificado';
            }
            else
                throw new Error('Contraseña actual incorrecta');
        } catch (error) {
            throw error;
        }
    }
    //D
    eliminarUsuario = async (id) => {
        let usuarioAEliminar = await User.findOne({
            where: {
                id: id,
                pass: this.pass
            }
        });
        try {
            if(usuarioAEliminar === null)
                throw new Error('Contraseña incorrecta')
            else {
                await usuarioAEliminar.destroy();
                return 'Usuario eliminado'
            }                
        } catch (error) {
            throw error
        }
    }
    
}