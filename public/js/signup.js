import User from './modules/user.js';

const form = document.getElementById('signin');
const name = document.getElementById('name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const pass = document.getElementById('pass');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const usuario = new User(email.value, pass.value, name.value, lastName.value);    
    let res = await usuario.signup();
    if(res.hasOwnProperty('error'))
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error
        })
    else {
        Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Usuario registrado'
        })
        setTimeout(() => {
            window.location = '/login'
        }, 2000);
    }
        
})