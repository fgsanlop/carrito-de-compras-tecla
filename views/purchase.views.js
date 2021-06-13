const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');
const middjwt = require('../midd/midd.jwt');
const middValidation = require('../midd/midd.validation');

router.post('/user/purchase/new', middjwt.checarToken, middValidation.validarCompra, async (req, res) => {        
    const token = req.headers.authorization.split(' ')[1];            
    const decoded = middjwt.decodificarToken(token);
    try {
        let resultado = await purchaseController.registrarCompra(req.body, decoded.data.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

router.get('/user/purchases', middjwt.checarToken, async (req,res) => {
    const token = req.headers.authorization.split(' ')[1];            
    const decoded = middjwt.decodificarToken(token);
    try {
        let resultado = await purchaseController.listarCompras(decoded.data.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

module.exports = router;