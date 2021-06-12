export default class User { 
    constructor(email, pass, name, last_name){
        this.email = email; 
        this. pass = pass;
        this.name = name;
        this.last_name = last_name;        
    }

    link = 'http://localhost:3000/api/user'
    
    login = async (recordar) => {        
        let req = await fetch(`${this.link}/login`, 
        {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.email,
                "pass": this.pass,
                "remember": recordar
            })
        })
        return await req.json();    
    }     
    
    signup = async () => {        
        let req = await fetch(`${this.link}/signup`, 
        {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.email,
                "pass": this.pass,
                "name": this.nombres,
                "last_name": this.apellidos
            })
        })
        return await req.json();    
    }  
}