const Joi = require('joi');

module.exports = {
    login: Joi.object().keys({
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().max(20),
        remember: Joi.boolean().required()
    }),

    signup: Joi.object().keys({
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().max(20),
        name: Joi.string().regex(/^[a-zA-Z]+$/).required().max(20),
        last_name: Joi.string().regex(/^[a-zA-Z]+$/).required().max(20),              
    }),

    userUpdate: Joi.object().keys({
        pass: Joi.string().required().max(20),
        name: Joi.string().regex(/^[a-zA-Z]+$/).required().max(20),
        last_name: Joi.string().regex(/^[a-zA-Z]+$/).required().max(20),              
    }),

    product: Joi.object().keys({
        category_id: Joi.number().integer().positive().required(),
        title: Joi.string().required().max(100),
        description: Joi.string().required().max(250),
        price: Joi.number().precision(2).min(1).max(999999999999).required(),
        picture: Joi.string().required().max(300),
        stock: Joi.number().integer().positive().required().max(999999)
    }),

    purchase: Joi.object().keys({
        address: Joi.string().max(150).required(),
        city: Joi.string().max(30).required(),
        zipcode: Joi.string().max(5).regex(/^[0-9]+$/).required(),
        method: Joi.string().max(30).required(),
        total: Joi.number().precision(2).min(1).max(999999999999).required(),
        products: Joi.array().required().items(
            Joi.object().keys({
                id: Joi.number().required(),
                price: Joi.number().precision(2).min(1).max(999999999999).required(),
                quantity: Joi.number().min(1).required(),
                subtotal: Joi.number().precision(2).min(1).max(999999999999).required(),
            })
        )
    }) 
}