import User from './modules/user.js';

const form = document.getElementById('signin');
const name = document.getElementById('name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const pass = document.getElementById('pass');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usuario = new User(name.value, lastName.value, email.value, pass.value);
    let req = await fetch("http://localhost:3000/api/user/register", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    let res = await req.json();
    
    if(res.hasOwnProperty('error')){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error
        })
    }        
    else {
        Swal.fire({
            icon: 'success',
            title: 'Listo!',
            text: res,
            footer: '<a href="/">Ir a inicio de sesión</a>'
          })
    }
        
})