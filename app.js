//Importaciones
const express = require('express');
const app = express();
const cors = require('cors');
const midd = require('./midd/midd');
const db = require('./db/db')
const routes = require('./routes/routes');
const sequelize = require('./db/db');

require('dotenv').config();

//Middlewares globales
app.use(express.json());
app.use(cors(midd.corsOptions));
app.use(midd.limiter);
app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
})

app.use('/api', routes);


const serverStart = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected!');
        app.listen(process.env.PORT, () => {
            console.log(`Server on: http://${process.env.HOST}:${process.env.PORT}`);
        })
    }catch (err){
        console.log('DB connection ERROR: ', err);
        
    }
}

serverStart();
