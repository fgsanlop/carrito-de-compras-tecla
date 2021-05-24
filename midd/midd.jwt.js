const jwt = require('jsonwebtoken');


module.exports.checarToken = (req, res, next) => {    
    if (req.headers.authorization != undefined) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.SECRET_KEY);            
            if (verified) 
                next();                
            else 
                throw new Error ('Token no valido')  
        } catch (error) {
            console.log(error);
            res.status(400).json({error: error.message})
        }              
    }
    else
        res.status(400).json('No tienes autorización para ver esto :/');    
}
