import MercadoLibre from './mercadolibre.js';
import Product from './product.js';

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});    

export default class UI {
    constructor(){
        this.tendencias = document.getElementById('tendencias');
        this.productos = document.getElementById('productos');
        this.loader = document.getElementById('loader');
        this.buscarForm = document.getElementById('buscarForm');
        this.buscarInput = document.getElementById('buscar');
        
        this.cart = document.getElementById('cart');
        this.total = document.getElementById('total');
        
        this.ml = new MercadoLibre();        
        
        this.buscarForm.addEventListener('submit', () => {  
            this.buscarInput.name = "q";
            this.buscarForm.action = "search.html";
            this.buscarForm.method = "GET";            
        })
    }

    llenarTendencias = async () => {
        let json = await this.ml.obtenerTendenciasMX()
        json.slice(0, 50).forEach(element => {
        let tendencia = document.createElement('a');
        tendencia.setAttribute('href', '#productos');
        tendencia.setAttribute('class', 'badge badge-pill bg-primary m-1 display-4 tendencia text-decoration-none text-light');         
        tendencia.addEventListener('click', () => {
            this.mostrarProductos(element.keyword)
        });
        tendencia.textContent = element.keyword;
        this.tendencias.appendChild(tendencia);         
    });

    await this.mostrarProductos(json[Math.floor(Math.random() * 11)].keyword)
    }

    mostrarProductos = async (palabra) => {
        this.productos.innerHTML = '';    
    
        this.loader.classList.toggle('d-none');
        
        let json = await this.ml.buscarProductos(palabra);
        this.productos.innerHTML = `<h4 class="col-12"><span class="text-muted">Mostrando resultados para: </span>${palabra}</h4>`;
        
        this.loader.classList.add('d-none');   
                            
    
        if (json.length == 0)
            this.productos.innerHTML += `<p class="col-12">No hay resultados para tu busqueda :(</h4>`;
        else {
            json.forEach(element => {     
                let col = document.createElement('div')
                col.setAttribute('class', 'col-sm-6 col-md-4 col-lg-3 mb-4');

                let card = document.createElement('div')
                card.setAttribute('class', 'card shadow-sm h-100');     

                let img = document.createElement('img')
                img.setAttribute('src', element.thumbnail);
                img.setAttribute('class', 'card-img-top mx-auto');    

                let body = document.createElement('div');
                body.setAttribute('class', 'card-body');

                let title = document.createElement('p');
                title.setAttribute('class', 'card-title text-muted');
                title.textContent = element.title;

                let text = document.createElement('h4');
                text.setAttribute('class', 'card-text');
                text.textContent = formatter.format(element.price)+ " " + element.currency_id;

                let footer = document.createElement('div');
                footer.setAttribute('class', 'card-footer text-center');        

                let button1 = document.createElement('a');
                button1.setAttribute('class', 'btn btn-primary');
                button1.setAttribute('href', `product.html?id=${element.id}`);
                button1.setAttribute('target', '_blank');
                button1.textContent = 'Ver más';

                let button2 = document.createElement('button');
                button2.setAttribute('class', 'btn btn-success ml-2');
                button2.setAttribute('id', element.id);
                button2.textContent = 'Agregar';
                button2.addEventListener('click', () => {
                    this.agregarProductoCarrito(element.id);
                })

                footer.appendChild(button1);
                footer.appendChild(button2);

                body.appendChild(title);
                body.appendChild(text);

                card.appendChild(img);
                card.appendChild(body);
                card.appendChild(footer)

                col.appendChild(card)

                this.productos.appendChild(col)                           
            })
        }
    }

    agregarProductoCarrito = async (id) => {
        const product = new Product(id);

        await product.mapearProducto();
        delete product.mapearProducto;

        product['subtotal'] = 0;

        if(product.id !== 0){
            if(localStorage.getItem(id) === null) {
                product.quantity = 1;
                product.subtotal = product.price * product.quantity;
                localStorage.setItem(id, JSON.stringify(product));
            }
            else{
                let product = JSON.parse(localStorage.getItem(id));
                product.quantity++;
                product.subtotal = product.price * product.quantity;
                localStorage.setItem(id, JSON.stringify(product));
            }                        
        }
    }

    mostrarCarrito = () => {
        if(localStorage.length == 0) {
            this.cart.innerHTML = '<p class="text-muted">No hay productos agregados aún...</p>';
            this.total.innerHTML = '<p class="text-muted">...</p>';
        }
        else {
            let montoTotal = 0;

            for(let i = 0; i < localStorage.length; i++){
                let product = JSON.parse(localStorage.getItem(localStorage.key(i))); 
                
                let alert = document.createElement('div');
                alert.setAttribute('class', 'alert alert-dismissible alert-light');

                let button = document.createElement('button');
                button.setAttribute('class', 'close');
                button.innerHTML = '&times;';
                button.addEventListener('click', () => { this.eliminarProductoCarrito(product.id) });

                let row = document.createElement('div');
                row.setAttribute('class', 'row');

                let col1 = document.createElement('div');
                col1.setAttribute('class', 'col-4 d-flex align-items-center');

                let a = document.createElement('a');
                a.href = 'product.html?id=' + product.id;                

                let img = document.createElement('img');
                img.src = product.pictures[0];
                img.style = 'max-width: 100%;';

                let col2 = document.createElement('div');
                col2.setAttribute('class', 'col');

                let productDetails = `
                <p class="lead">${product.title}</p>
                <p>${formatter.format(product.price)} ${product.currency_id}</p>
                <p><span class="text-muted">Cantidad:</span> ${product.quantity}</p>
                <h5 class="text-primary">Total: ${formatter.format(product.subtotal)} ${product.currency_id}</h5>
                `;

                this.cart.appendChild(alert);
                alert.appendChild(button);
                alert.appendChild(row);

                col1.appendChild(a);
                a.appendChild(img);

                row.appendChild(col1);
                row.appendChild(col2);

                col2.innerHTML = productDetails;

                montoTotal += product.subtotal;
            }

            let buttonPagar = document.createElement('button');
            buttonPagar.setAttribute('class', 'btn btn-primary w-100');
            buttonPagar.innerText = 'Pasar a checkout'; 

            let h1 = document.createElement('h1');
            h1.setAttribute('class', 'mb-4 mt-n2')
            h1.textContent = formatter.format(montoTotal) + ' MXN';

            this.total.appendChild(h1);
            this.total.appendChild(buttonPagar);

        }
    }

    eliminarProductoCarrito = (id) => {
        if(window.confirm('¿Seguro que deseas quitar este producto de tu carrito?')){
            localStorage.removeItem(id);
            this.total.innerHTML = '';
            this.cart.innerHTML = ''
            this.mostrarCarrito();
        }            
    }
}