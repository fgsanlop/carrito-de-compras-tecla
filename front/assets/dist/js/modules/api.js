export default class Api {
    constructor(){
        this.url = 'http://localhost:3000/api';
    }    

    obtenerTendenciasMX = async () => {
        let res = await fetch(this.url + '/trends');
        let json = await res.json();
        
        return json.slice(0, 50);
    }

    obtenerCatergorias = async () => {
        let res = await fetch(this.url + '/categories/');
        let json = await res.json();
        
        return json;
    }
    
    buscarProductos = async (palabra) => {         
        let res = await fetch(this.url + '/search/' + palabra);
        let json = await res.json();
        
        return json;
    }

    buscarProductosPorCategoria = async (id) => {         
        let res = await fetch(this.url + '/products/' + id);
        let json = await res.json();
        
        return json;
    }

    buscarProducto = async (id) => {
        let res = await fetch(this.url + '/product/' + id);
        let json = await res.json();

        return json;
    }
}
