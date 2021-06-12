import UI from './modules/ui.js';

const ui = new UI();

const querystring = window.location.search;
const params = new URLSearchParams(querystring)
const id = params.get('id');

if(!id)
    window.location = "/";
else {
    ui.mostrarProducto(id);
}