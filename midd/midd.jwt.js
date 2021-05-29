const jwt = require('jsonwebtoken');

const headerView = (req, res, next) => {
    let token = req.cookies.token;
    req.headers.authorization = `Bearer ${token}`
    next();
}

const loggeado = (req, res, next) => {
    if(req.cookies.token != undefined)
        res.redirect('/index')         
    next();
}

const checarToken = (req, res, next) => {    
    if (req.headers.authorization != undefined) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.SECRET_KEY);  
            //console.log('TOKEEEEEEEEN:', verified);          
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
        res.status(400).json({error:'No tienes autorización para ver esto :/'});    
}

module.exports = {
    headerView,
    checarToken,
    loggeado
}