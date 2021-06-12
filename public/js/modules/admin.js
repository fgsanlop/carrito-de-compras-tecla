export default class Admin { 
    constructor(email, pass){
        this.email = email; 
        this. pass = pass;
        this.url = 'http://localhost:3000/';
    }

    login = async (check) => {
        let req = await fetch(`${this.url}api/admin/login`, {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": this.email,
            "pass": this.pass,
                "remember": check
            })
        });

        return await req.json();
    }
}

