const form = document.getElementById('signin');
const name = document.getElementById('name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const recordar = document.getElementById('recordar');
const error = document.getElementById('error');
const ok = document.getElementById('ok');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let req = await fetch("http://localhost:3000/api/user/register", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "pass": pass.value,
            "name": name.value,
            "last_name": lastName.value
        })
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