let express = require('express');
let categoriesController = require('../controllers/category.controller');
let router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        console.log(categoriesController);
        let categorias = await categoriesController.listarCategorias();
        res.send(categorias);
    } catch(error) {
        res.status(404).send({error: error.message});
    }
})

module.exports = router;