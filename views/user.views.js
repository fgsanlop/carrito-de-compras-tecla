const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const middjwt = require('../midd/midd.jwt');
const jwt_decode = require('jwt-decode');

router.post('/user/register', async (req, res) => {
    let body = req.body;    
    try {
        if (Object.keys(body).length == 0)
            throw new Error('Datos vacios')
        let resultado = await UserController.registrarUsuario(body);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.post('/user/login', async (req, res) => {
    let body = req.body;    
    let remember = req.body.remember;
    try {
        if (Object.keys(body).length == 0)
            throw new Error('Datos vacios');

        let resultado = await UserController.iniciarSesion(body); 

        if (remember)    
            res.status(200).cookie('token', resultado, {maxAge: 31536000000}).json(resultado);  //Cookie expira en un año                              
        else
            res.status(200).cookie('token', resultado).json(resultado);
    } catch (error) {
        res.status(400).send({error: error.message});    
    }
});

router.put('/user/update/:id', middjwt.checarToken, async (req,res) => {
    let id = req.params.id;
    let body = req.body;
    const token = req.headers.authorization.split(' ')[1];            
    const decoded = jwt_decode(token);
    try {
        if(decoded.data.id == id) {
            if (Object.keys(body).length == 0)
            throw new Error('Datos vacios');
            let resultado = await UserController.modificarUsuario(id, body);
            res.status(200).json(resultado);
        }
        else
            throw new Error('No tienes acceso a este usuario')
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.delete('/user/delete/:id', middjwt.checarToken, async (req,res) => {
    let id = req.params.id;    
    const token = req.headers.authorization.split(' ')[1];            
    const decoded = jwt_decode(token);
    try {
        if(decoded.data.id == id) {
            let resultado = await UserController.eliminarUsuario(id);
            res.status(200).json(resultado);
        }
        else
        throw new Error('No tienes acceso a este usuario');
    } catch (error) {
        res.status(400).send({error: error.message});
    }
});

router.get('/user/logout', middjwt.checarToken, async (req,res) => {
    res.clearCookie('token');
    res.location('/')
});


module.exports = router;