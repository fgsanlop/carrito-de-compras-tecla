import UI from './modules/ui.js';

if(localStorage.length == 0)
    window.location = 'cart.html';

const ui = new UI();

ui.mostrarCheckout();

    