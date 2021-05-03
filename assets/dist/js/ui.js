let tendencias = document.getElementById('tendencias');
let productos = document.getElementById('productos');
let loader = document.getElementById('loader');
const buscarForm = document.getElementById('buscarForm');
const buscarInput = document.getElementById('buscar');

let url = 'https://api.mercadolibre.com/';

async function getTendenciasMX() {
    let res = await fetch(url + 'trends/MLM/MLM1144');
    let json = await res.json();
    console.log(json);
    json.slice(0, 50).forEach(element => {
        let tendencia = document.createElement('a');
        tendencia.setAttribute('href', '#productos');
        tendencia.setAttribute('class', 'badge badge-pill bg-primary m-1 display-4 tendencia text-decoration-none text-light');     
        tendencia.setAttribute('onclick', 'buscarProductos("'+ element.keyword +'")');        
        tendencia.textContent = element.keyword;
        tendencias.appendChild(tendencia);         
    });

    await buscarProductos(json[Math.floor(Math.random() * 11)].keyword)
}

async function buscarProductos(palabra) { 
    productos.innerHTML = '';    

    loader.classList.toggle('d-none');
    
    let res = await fetch(url + 'sites/MLM/search?q=' + palabra);
    let json = await res.json();

    productos.innerHTML = `<h4 class="col-12"><span class="text-muted">Mostrando resultados para: </span>${palabra}</h4>`;
    loader.classList.add('d-none');
    console.log(json);

    if (json.results.length == 0)
        productos.innerHTML += `<p class="col-12">No hay resultados para tu busqueda :(</h4>`;
    else {
        json.results.forEach(element => {                
            let html = `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card shadow-sm h-100">
                    <img src="${element.thumbnail}" class="card-img-top mx-auto my-2">
                    <div class="card-body">
                        <p class="card-title text-muted">${element.title}</p>
                        <h4 class="card-text">$ ${element.price} ${element.currency_id}</h4>
                    </div>
                    <div class="card-footer text-center">
                        <a class="btn btn-primary" href="product.html?id=${element.id}" target="_blank">Ver más</a>
                        <button class="btn btn-success" id="agregar" value="${element.id}">Agregar</button
                    </div>
                </div>
            </div>        
            `    
            productos.innerHTML += html;
        })
    }
}



buscarForm.addEventListener('submit', event => {
    event.preventDefault();
    buscarProductos(buscarInput.value);
    productos.scrollIntoView();
})

getTendenciasMX();
