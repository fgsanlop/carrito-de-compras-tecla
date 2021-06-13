const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const middjwt = require('../midd/midd.jwt');
const middValidation = require('../midd/midd.validation');

router.post('/user/register', middValidation.validarSignUp, async (req, res) => {
    let body = req.body;    
    try {
        let resultado = await userController.registrarUsuario(body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/user/login', middValidation.validarLogin, async (req, res) => {
    let body = req.body;    
    let remember = req.body.remember;
    try {
        let resultado = await userController.iniciarSesion(body); 
        if (remember)    
            res.status(200).cookie('token', resultado, {maxAge: 31536000000}).json(resultado);  //Cookie expira en un año                              
        else
            res.status(200).cookie('token', resultado).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});    
    }
});

router.post('/admin/login', middValidation.validarLogin, async (req, res) => {
    let body = req.body;    
    let remember = req.body.remember;
    try {
        let resultado = await userController.iniciarSesionAdmin(body); 

        if (remember)
            res.status(200).cookie('tokenAdmin', resultado, {maxAge: 31536000000}).json(resultado);  //Cookie expira en un año                              
        else
            res.status(200).cookie('tokenAdmin', resultado).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});    
    }
});

router.get('/user/data', middjwt.checarToken, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const decoded = middjwt.decodificarToken(token);
        let resultado = await userController.obtenerDatos(decoded.data.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.put('/user/update', middjwt.checarToken, middValidation.validarActualizacionUsuario, async (req,res) => {    
    let body = req.body;
    const token = req.headers.authorization.split(' ')[1];                
    try {
        const decoded = middjwt.decodificarToken(token);
        let resultado = await userController.modificarUsuario(decoded.data.id, body);
        res.status(200).json(resultado);  
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/user/delete/', middValidation.validarEliminacionUsuario, middjwt.checarToken, async (req,res) => {    
    const token = req.headers.authorization.split(' ')[1];                
    try {        
        const decoded = middjwt.decodificarToken(token);
        let resultado = await userController.eliminarUsuario(decoded.data.id, req.body.pass);
        res.status(200).json(resultado); 
        res.clearCookie('token');       
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/user/logout', middjwt.headerViewUsuario, middjwt.checarToken, async (req,res) => {
    res.clearCookie('token');    
    res.redirect('/');  
});

router.get('/admin/logout', middjwt.headerViewAdmin, middjwt.checarTokenAdmin, async (req,res) => {
    res.clearCookie('tokenAdmin');    
    res.redirect('/admin/login');
});

module.exports = router;