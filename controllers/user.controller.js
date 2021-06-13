const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const generarToken = async (data) => {
    try {
        let tokenSign = jwt.sign({data}, process.env.SECRET_KEY)
        return tokenSign
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

const registrarUsuario = async (data) => {
    const { email, pass, name, last_name } = data;
    let nuevoUsuario = new UserModel(email, pass, name, last_name);    
    try {
        let res = await nuevoUsuario.registrarUsuario();
        return res;
    } catch (error) {
        throw error;
    }    
}

const obtenerDatos = async (id) => {        
    try {
        let usuario = UserModel.obtenerDatos(id);
        return usuario;
    } catch (error) {
        throw error;
    }    
}

const iniciarSesion = async (data) => {
    const { email, pass } = data;
    let loginUsuario = new UserModel(email, pass, '', '');
    let correcto = await loginUsuario.comprobarCredenciales(1);
    try {
        if(correcto !== false) {
            console.log(correcto);
            let token = await generarToken(correcto);
            console.log(token)
            return token;
        }
        else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw error;
    }
}

const iniciarSesionAdmin = async (data) => {
    const { email, pass } = data;
    let loginAdmin = new UserModel(email, pass, '', '');
    let correcto = await loginAdmin.comprobarCredenciales(2);
    try {
        if(correcto !== false) {
            console.log(correcto);
            let token = await generarToken(correcto);
            console.log(token)
            return token;
        }
        else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw error;
    }
}

const modificarUsuario = async (id, data) => {
    const { name, last_name, pass, new_pass } = data;  
    let modUsuario = new UserModel('', pass, name, last_name); 
    try {        
        let res = await modUsuario.modificarUsuario(id, new_pass);
        return res;
    } catch (error) {
        throw error;
    }
}

const eliminarUsuario = async (id, pass) => {  
    try {        
        let usuarioAEliminar = new UserModel('', pass);
        let res = await usuarioAEliminar.eliminarUsuario(id);
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarToken,
    registrarUsuario,
    iniciarSesion,
    iniciarSesionAdmin,
    modificarUsuario,
    eliminarUsuario,
    obtenerDatos
}