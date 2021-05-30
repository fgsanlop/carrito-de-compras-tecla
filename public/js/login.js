const form = document.getElementById('login');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const recordar = document.getElementById('recordar');
const error = document.getElementById('error');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let check = recordar.checked;
    let req = await fetch("http://localhost:3000/api/user/login", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "pass": pass.value,
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
        window.location = '';
})