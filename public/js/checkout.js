import UI from './modules/ui.js';
import Purchases from './modules/purchase.js';

const form = document.getElementById('purchase');

if(localStorage.length == 0)
    window.location = 'cart';

const ui = new UI();

ui.mostrarCheckout();

form.addEventListener('submit', async (event) => { 
    event.preventDefault();

    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const method = document.querySelector('input[name="method"]:checked').value;    

    let products = new Array();

    for (let i = 0; i < localStorage.length; i++){
        let product = JSON.parse(localStorage.getItem(localStorage.key(i)))
        let productToPush = {
            id: product.id,
            price: product.price,
            quantity: product.quantity,
            subtotal: product.subtotal
        }
        products.push(productToPush);
    }
    
    let compra = new Purchases(address, city, zipcode, method, products);

    let res = await compra.registrarCompra();

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
            text: res
        })
        setTimeout(() => {
            window.location = '/purchases'
        }, 2000);
        localStorage.clear();
    }
        
})
    