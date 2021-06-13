import { getCookie } from './cookies.js';

let token = getCookie('token');     
let myHeaders = new Headers();
//
myHeaders.append('Accept', 'application/json, text/plain, *,*');
myHeaders.append('Content-Type', 'application/json');
const link = 'http://localhost:3000/api/user';

export default class User { 
    constructor(email, pass, name, last_name){
        this.email = email; 
        this. pass = pass;
        this.name = name;
        this.last_name = last_name;        
    }
    
    login = async (recordar) => {        
        let req = await fetch(`${link}/login`, 
        {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "email": this.email,
                "pass": this.pass,
                "remember": recordar
            })
        })
        return await req.json();    
    }     
    
    signup = async () => {        
        let req = await fetch(`${link}/register`, 
        {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "email": this.email,
                "pass": this.pass,
                "name": this.name,
                "last_name": this.last_name
            })
        })
        return await req.json();    
    }  

    static obtenerDatos = async () => {
        myHeaders.append('Authorization', `Bearer ${token}`);
        let req = await fetch(`${link}/data`, 
        {
            headers: myHeaders
        });
        return await req.json();           
    }

    modificarUsuario = async (new_pass) => {  
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, *,*');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);      
        let req = await fetch(`${link}/update`, 
        {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({
                "name": this.name,
                "last_name": this.last_name,
                "pass": this.pass,
                "new_pass": new_pass            
            }),
            redirect: 'follow'
        })        

        return await req.json();    
    }
    
    eliminarUsuario = async () => {  
        let myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, *,*');
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);      
        let req = await fetch(`${link}/delete`, 
        {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({
                "pass": this.pass            
            }),
            redirect: 'follow'
        })        

        return await req.json();    
    }
}