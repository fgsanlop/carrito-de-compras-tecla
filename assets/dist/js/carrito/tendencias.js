let tendencias = document.getElementById('tendencias');
let productos = document.getElementById('productos');
let loader = document.getElementById('loader')

let url = 'https://api.mercadolibre.com/';

async function getTendenciasMX() {
    let res = await fetch(url + 'trends/MLM/MLM1144');
    let json = await res.json();
    console.log(json);
    json.slice(0, 50).forEach(element => {
        let tendencia = document.createElement('a');
        tendencia.setAttribute('href', '#productos');
        tendencia.setAttribute('class', 'badge bg-secondary m-1 display-4 tendencia text-decoration-none text-light');     
        tendencia.setAttribute('onclick', 'buscarProductos("'+ element.keyword +'")');        
        tendencia.textContent = element.keyword;
        tendencias.appendChild(tendencia);         
    });
}

async function buscarProductos(palabra) { 
    productos.innerHTML = '';

    loader.classList.toggle('d-none');
    
    let res = await fetch(url + 'sites/MLM/search?q=' + palabra);
    let json = await res.json();

    loader.classList.add('d-none');
    console.log(json);

    json.results.forEach(element => {        
        /*
        let html = `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card shadow-sm h-100">
                <img src="http://http2.mlstatic.com/D_969958-MLA32731593032_112019-I.jpg" class="card-img-top mx-auto my-2">
                <div class="card-body">
                    <p class="card-title text-muted">Nintendo  3ds 2ds New Super Mario Bros. 2 Color  Blanco Y Rojo</p>
                    <h4 class="card-text">$ 5199 MXN</h4>
                </div>
                <div class="card-footer text-center">
                    <a class="btn btn-primary" href="https://www.mercadolibre.com.mx/nintendo-3ds-2ds-new-super-mario-bros-2-color-blanco-y-rojo/p/MLM6311991" target="_blank">Ver más</a>
                </div>
            </div>
        </div>        
        `
        */
        let col = document.createElement('div')
        col.setAttribute('class', 'col-sm-6 col-md-4 col-lg-3 mb-4');
        
        let card = document.createElement('div')
        card.setAttribute('class', 'card shadow-sm h-100');     

        let img = document.createElement('img')
        img.setAttribute('src', element.thumbnail);
        img.setAttribute('class', 'card-img-top mx-auto my-2');    

        let body = document.createElement('div');
        body.setAttribute('class', 'card-body');

        let title = document.createElement('p');
        title.setAttribute('class', 'card-title text-muted');
        title.textContent = element.title;

        let text = document.createElement('h4');
        text.setAttribute('class', 'card-text');
        text.textContent = "$ " + element.price + " " +element.currency_id;

        let footer = document.createElement('div');
        footer.setAttribute('class', 'card-footer text-center');        

        let button = document.createElement('a');
        button.setAttribute('class', 'btn btn-primary');
        button.setAttribute('href', element.permalink);
        button.setAttribute('target', '_blank');
        button.textContent = 'Ver más';

        footer.appendChild(button);
        
        body.appendChild(title);
        body.appendChild(text);

        card.appendChild(img);
        card.appendChild(body);
        card.appendChild(footer)

        col.appendChild(card)
        
        productos.appendChild(col)
    })
}

getTendenciasMX();