let tendencias = document.getElementById('tendencias');
let productos = document.getElementById('productos');
let loader = document.getElementById('loader')

let url = 'https://api.mercadolibre.com/';

async function getTendenciasMX() {
    let res = await fetch(url + 'trends/MLM/MLM1144');
    let json = await res.json();
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

    json.results.forEach(element => {
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