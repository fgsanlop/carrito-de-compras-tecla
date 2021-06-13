const Joi = require('joi')
const validations = require('./validations')

const validarLogin = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.login, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarSignUp = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.signup, 'Datos incorrectos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarActualizacionUsuario = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.userUpdate, 'Datos incorrectos');
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const validarRegistroModProducto = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.product, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
} 

const validarCompra = async (req, res, next) => {
    try{
        await Joi.attempt(req.body, validations.purchase, 'Datos incorrectos')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
} 

module.exports = {
    validarLogin,
    validarSignUp,
    validarActualizacionUsuario,
    validarRegistroModProducto,
    validarCompra
}