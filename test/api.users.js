let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let fetch = require('node-fetch');

chai.use(chaiHttp);

let jwt = require('jsonwebtoken');
require('dotenv').config();

const url= 'http://localhost:3000/api/';

describe('Login de usuarios: ', () => {
    it('Datos invalidos', (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: 'correo@falso.com',
            pass: '1234'
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);    
            done();        
        });        
    });
    it('Falta de datos en body', (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: 'correo@falso.com',            
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);
            done();
        });
    });
    it('Validacion correo', (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: 'correo@',
            pass: '123'            
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);
            done();
        });
    });
    it('Validacion longitud', (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: 'correo@falso.com',
            pass: '123-----------------------------------'            
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);
            done();
        });
    });
    it('Login correcto', (done) => {
        chai.request(url)
        .post('/user/login')
        .send({
            email: 'prueba@test.com',
            pass: '12dsdf'            
        })
        .end((err,res) => {
            expect(res.body).to.be.a('string');
            expect(res.statusCode).to.equal(200);
            tokenUsuario = res.body;
            console.log(res.body);
            done();
        });
    }); 
});

describe('Login de administrador: ', () => {    
    it('Login correcto', (done) => {
        chai.request(url)
        .post('/admin/login')
        .send({
            email: 'adminloco@gmail.com',
            pass: 'contraseña'            
        })
        .end((err,res) => {
            expect(res.body).to.be.a('string');
            expect(res.statusCode).to.equal(200);
            tokenAdmin = res.body;
            console.log(res.body);
            done();
        });
    }); 
});

describe('CRUD usuarios: ', () => {    
    it('Validacion nombre/apellido solo letras', (done) => {
        chai.request(url)
        .post('/user/register')
        .send({
            email: 'nuevo@usuario.com',
            pass: '123',
            name: 'Panch0',
            last_name: 'V1lla'
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);
            done();
        });
    }); 
    it('Validar correo ya registrado', (done) => {
        chai.request(url)
        .post('/user/register')
        .send({
            email: 'sanchez.lopez@gmail.com',
            pass: '123',
            name: 'Nombre',
            last_name: 'Apellido'
        })
        .end((err,res) => {
            expect(res.body).to.have.property('error');
            console.log(res.body);
            done();
        });
    }); 
    it('Registro correcto', (done) => {
        chai.request(url)
        .post('/user/register')
        .send({
            email: 'nuevo@usuario.com',
            pass: '123',
            name: 'Nombre',
            last_name: 'Apellido'
        })
        .end((err,res) => {
            expect(res.body).to.be.a('string');
            console.log(res.body);
            done();
        });
    });
    it('Modificacion de usuario', async () => {
        let raw = JSON.stringify({
            "email": "nuevo@usuario.com",
            "pass": "123"
        });
          
        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        };

        fetch(`${url}user/login`, requestOptions)
        .then(result => result.json())
        .then(json => {
            let decoded = jwt.verify(json, process.env.SECRET_KEY);
            let id = decoded.data.id;
            chai.request(url)
            .put(`/user/update/${id}`)
            .set('Authorization', `Bearer ${json}`)
            .send({
                pass: "mod",
                name: "mod",
                last_name: "mod"  
            })
            .end((err,res) => {
                console.log(res.body);     
                expect(res.body).to.be.a('string');
                       
            })
        })
    }); 
    it('Modificacion de usuario con ID que no corresponde', async () => {
        let raw = JSON.stringify({
            "email": "nuevo@usuario.com",
            "pass": "123"
        });
          
        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        };

        fetch(`${url}user/login`, requestOptions)
        .then(result => result.json())
        .then(json => {
            chai.request(url)
            .put(`/user/update/0`)
            .set('Authorization', `Bearer ${json}`)
            .send({
                pass: "mod",
                name: "mod",
                last_name: "mod"  
            })
            .end((err,res) => {
                expect(res.body).has.property('error');
                console.log(res.body);            
            })
        })
    }); 
    it('Eliminacion de usuario con ID que no corresponde', async () => {
        let raw = JSON.stringify({
            "email": "nuevo@usuario.com",
            "pass": "123"
        });
          
        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        };

        fetch(`${url}user/login`, requestOptions)
        .then(result => result.json())
        .then(json => {
            
            chai.request(url)
            .delete(`/user/delete/0`)
            .set('Authorization', `Bearer ${json}`)
            .end((err,res) => {
                expect(res.body).has.property('error');
                console.log(res.body);            
            })


        })
    }); 
    it('Eliminacion de usuario', async () => {
        let raw = JSON.stringify({
            "email": "nuevo@usuario.com",
            "pass": "123"
        });
          
        let requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        };

        fetch(`${url}user/login`, requestOptions)
        .then(result => result.json())
        .then(json => {

            let decoded = jwt.verify(json, process.env.SECRET_KEY);
            let id = decoded.data.id;
            
            chai.request(url)
            .delete(`/user/delete/${id}`)
            .set('Authorization', `Bearer ${json}`)
            .end((err,res) => {
                expect(res.body).to.be.a('string');
                console.log(res.body);            
            })
        })
    });       
});

