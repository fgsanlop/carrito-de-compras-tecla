import User from '../modules/user.js';

const form = document.getElementById('login');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const recordar = document.getElementById('recordar');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usuario = new User('', '', email.value, pass.value);
    let check = recordar.checked;
    let req = await fetch("http://localhost:3000/api/admin/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": usuario.email,
            "pass": usuario.pass,
            "remember": check
        })
    });

    let res = await req.json();
    
    if(res.hasOwnProperty('error'))
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error
        })
    else
        window.location = '/admin/index'
})