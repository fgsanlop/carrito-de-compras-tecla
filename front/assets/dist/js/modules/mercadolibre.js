export default class MercadoLibre {
    constructor(){
        this.url = 'http://localhost:3000/';
    }    

    obtenerTendenciasMX = async () => {
        let res = await fetch(this.url + 'tendencias');
        let json = await res.json();
        
        return json.slice(0, 50);
    }

    obtenerCatergorias = async () => {
        let res = await fetch(this.url + 'categorias/');
        let json = await res.json();
        
        return json;
    }
    
    buscarProductos = async (palabra) => {         
        let res = await fetch(this.url + 'buscar/' + palabra);
        let json = await res.json();
        
        return json;
    }

    buscarProductosPorCategoria = async (id) => {         
        let res = await fetch(this.url + 'categoria/' + id);
        let json = await res.json();
        
        return json;
    }

    buscarProducto = async (id) => {
        let res = await fetch(this.url + 'producto/' + id);
        let json = await res.json();

        return json;
    }
}
