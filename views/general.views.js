const express = require('express');
const middjwt = require('../midd/midd.jwt');
const router = express.Router();

router.get('/', /*middjwt.loggeado,*/ (req, res) => {
    res.render('login', {error: ''});
});

router.get('/signup', (req, res) => {
    res.render('signup', {error: ''});
});

router.get('/index', middjwt.headerView, middjwt.checarToken, (req, res) => {
    res.render('index');
})
 
router.get('/super-carga-chetada', (req, res) => {
    res.render('-carga-productos-ml-');
})

module.exports = router;