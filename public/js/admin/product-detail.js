import UI from '../modules/ui-admin.js';

const ui = new UI();

const querystring = window.location.search;
const params = new URLSearchParams(querystring)
const id = params.get('id');

ui.llenarDatosProducto(id);
