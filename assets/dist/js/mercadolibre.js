export default class MercadoLibre {
    constructor(){
        this.url = 'https://api.mercadolibre.com/';
    }    

    obtenerTendenciasMX = async () => {
        let res = await fetch(this.url + 'trends/MLM/MLM1144');
        let json = await res.json();
        
        return json.slice(0, 50);
    }
    
    buscarProductos = async (palabra) => {         
        let res = await fetch(this.url + 'sites/MLM/search?q=' + palabra);
        let json = await res.json();
        
        return json.results;
    }
}
