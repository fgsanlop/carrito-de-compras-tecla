import User from './modules/user.js';

const form = document.getElementById('user');
const updatedAt = document.getElementById('updatedAt');
const email = document.getElementById('email');
const name = document.getElementById('name');
const last_name = document.getElementById('last_name');
const new_pass = document.getElementById('new_pass');
const deleteBtn = document.getElementById('delete');

let datos = await User.obtenerDatos();
let fecha = new Date(datos.updatedAt);

updatedAt.innerHTML = fecha.toLocaleString();
email.value = datos.email;
name.value = datos.name;
last_name.value = datos.last_name;

deleteBtn.addEventListener('click', async () => {
    if(pass.value == new_pass.value) {
        Swal.fire({
            title: '¿De verdad quieres borrar tu cuenta?',
            text: 'Se eliminaran tus datos y tu historial de compras',
            showDenyButton: true,
            confirmButtonText: `Si :(`,
            denyButtonText: `No :)`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                
                let usuarioAEliminar = new User('', pass.value);
                let res = await usuarioAEliminar.eliminarUsuario();
                
                if(res.hasOwnProperty('error'))
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: res.error
                    })
                else {
                    Swal.fire({
                        icon: 'success',
                        title: res,
                        text: 'Usuario eliminado'
                    })
                    setTimeout(() => {
                    window.location = '/api/user/logout'
                    }, 3000);
                }  


            }
          })
    }
    else {
        Swal.fire({
            icon: 'info',
            title: 'La confirmación de contraseña no es igual a la contraseña'
        })
    }    
})


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let usuarioModificado = new User('', pass.value, name.value, last_name.value);
    let res = await usuarioModificado.modificarUsuario(new_pass.value);
    
    if(res.hasOwnProperty('error'))
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error
        })
    else {
        Swal.fire({
            icon: 'success',
            title: res,
            text: 'Se cerrara la sesión para aplicar los cambios'
        })
        setTimeout(() => {
           window.location = '/api/user/logout'
        }, 5000);
    }     
});

