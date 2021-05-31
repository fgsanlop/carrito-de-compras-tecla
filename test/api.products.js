let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let fetch = require('node-fetch');

chai.use(chaiHttp);

let jwt = require('jsonwebtoken');
require('dotenv').config();

const url= 'http://localhost:3000/api/';

let raw = JSON.stringify({
    "email": "adminloco@gmail.com",
    "pass": "contraseña"
});
  
let requestOptions = {
    method: 'POST',
    body: raw,
    headers: {
        "Content-Type": "application/json"
    },
    redirect: 'follow'
};


describe('Registro de productos: ', () => {
    it('Prueba', () => {
        fetch(`${url}admin/login`, requestOptions)
        .then(result => result.json())
        .then(json => {
     
        })
        
    });
    
});

