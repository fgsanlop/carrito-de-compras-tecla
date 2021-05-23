//Importaciones
const express = require('express');
const app = express();
const cors = require('cors');
const midd = require('./midd/midd');
const sequelize = require('./db/conn')
const routes = require('./routes/routes');
require('dotenv').config();

const Role = require('./db/roles');
const User = require('./db/users');

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
 
//Rutas
app.use('/api', routes);

//Correr servidor y conexion a BD
const serverStart = async () => {
    try {                
        await sequelize.authenticate();        
        await Role.sync({alter:true});
        await User.sync({alter:true}); 

        //Parametros iniciales para roles, aqui tambien entrarian categorias (datos precargados)
        await Role.findOrCreate({
            where: {
                name: 'Cliente', 
                description: 'Compra productos de Tecla Store'
            }
        });
        await Role.findOrCreate({
            where: {
                name: 'Administrador', 
                description: 'Controla inventario de Tecla Store'
            }
        });        

        //Algunos usuarios de prueba
        await User.findOrCreate({
            where: {
                role_id: 2, //este es el de admin
                email: 'adminloco@gmail.com', 
                pass: 'contraseña', 
                name: 'Gabriel', 
                last_name: 'López' 
            }
        }); 

        await User.findOrCreate({
            where: {
                role_id: 1, //este es el de cliente 
                email: 'sanchez.lopez@gmail.com', 
                pass: 'maquinola', 
                name: 'Fernando', 
                last_name: 'Sánchez'
            }
        }); 

        await User.findOrCreate({
            where: {
                role_id: 1,
                email: 'mr.robot@friend.py', 
                pass: '123cuatro', 
                name: 'Elliot', 
                last_name: 'Alderson'
            }
        });    

        app.listen(process.env.PORT, () => {
            console.log(`Server on: http://${process.env.HOST}:${process.env.PORT}`);
        })
    }catch (err){
        console.log('DB connection ERROR: ', err);
    }
}

serverStart();