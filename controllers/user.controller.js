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

const iniciarSesion = async (data) => {
    const { email, pass } = data;
    let loginUsuario = new UserModel(email, pass, '', '');
    let correcto = await loginUsuario.comprobarCredenciales();
    try {
        if(correcto !== false) {
            console.log(correcto);
            let token = await generarToken(correcto);
            console.log(token)
            return token;
        }
        else {
            throw new Error('Credenciales incorrecta');
        }
    } catch (error) {
        throw error;
    }
}

const modificarUsuario = async (id, data) => {
    const { pass, name, last_name } = data;  
    let modUsuario = new UserModel('', pass, name, last_name); 
    try {        
        let res = await modUsuario.modificarUsuario(id);
        return res;
    } catch (error) {
        throw error;
    }
}

const eliminarUsuario = async (id) => {  
    try {        
        let res = await UserModel.eliminarUsuario(id);
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    generarToken,
    registrarUsuario,
    iniciarSesion,
    modificarUsuario,
    eliminarUsuario
}