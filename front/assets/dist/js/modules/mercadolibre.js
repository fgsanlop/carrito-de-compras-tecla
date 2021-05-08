export default class MercadoLibre {
    constructor(){
        this.url = 'https://api.mercadolibre.com/';
    }    

    obtenerTendenciasMX = async () => {
        let res = await fetch(this.url + 'trends/MLM/MLM1144');
        let json = await res.json();
        
        return json.slice(0, 50);
    }

    obtenerCatergorias = async () => {
        
    }
    
    buscarProductos = async (palabra) => {         
        let res = await fetch(this.url + 'sites/MLM/search?category=MLM1144&q=' + palabra);
        let json = await res.json();
        
        return json;
    }

    buscarProducto = async (id) => {
        let res = await fetch(this.url + 'items/' + id);
        let json = await res.json();

        let resdes = await fetch(this.url + 'items/' + id +'/descriptions');
        let jsondes = await resdes.json();

        if(!jsondes.hasOwnProperty('error'))
            json["description"] = jsondes[0].plain_text;

        return json;
    }
}
