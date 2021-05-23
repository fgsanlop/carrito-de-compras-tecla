const jwt = require('jsonwebtoken')

module.exports.checarToken = async (req, res, next) => {
    let headerAuth = req.headers.authorization;    
    if (headerAuth != undefined) {
        let token = headerAuth.split(' ')[1];
        let verification = jwt.verify(token, process.env.SECRET_KEY);
        
        if (verification)
            return next;
        else 
            throw new Error ('Token no valido')        
    }
    else 
        res.status(400).json('No tienes autorización para ver esto :/');    
}