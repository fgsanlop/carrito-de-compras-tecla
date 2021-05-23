var express = require('express');
var categoriesService = require('../controllers/category.controller');

var router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        let categories = await categoriesService.obtenerCatergorias();
        res.send(categories);
    } catch(error) {
        let errorMsg = {
            error: error.message
        }
        res.status(404).send(errorMsg);
    }
})

module.exports = router;