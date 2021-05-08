import UI from './modules/ui.js';

const ui = new UI();

const querystring = window.location.search;
const params = new URLSearchParams(querystring)
const q = params.get('q');

if(!q)
    window.location = "sorry.html";
else   
    ui.mostrarProductos(q);


