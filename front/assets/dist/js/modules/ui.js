import MercadoLibre from './mercadolibre.js';
import Product from './product.js';

//Se usa para darle formato de dinero a los numeros
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});    

export default class UI {
    //Obtiene los elementos de los distintos HTML donde se importe
    constructor(){
        //Index
        this.tendencias = document.getElementById('tendencias');
        //Index y busqueda
        this.productos = document.getElementById('productos');
        this.loader = document.getElementById('loader');
        //Formulario de busqueda
        this.buscarForm = document.getElementById('buscarForm');
        this.buscarInput = document.getElementById('buscar');
        //Carrito
        this.cart = document.getElementById('cart');
        this.total = document.getElementById('total');
        //Detalle de producto
        this.productTitle = document.getElementById('product-title');
        this.productPrice = document.getElementById('product-price');  
        this.productUpdated = document.getElementById('product-update');
        this.productAddCartBtn = document.getElementById('product-add');
        this.productDescription = document.getElementById('product-description');
        this.productPictures = document.getElementById('product-pictures')
        //Objeto MercadoLibre para las consultas
        this.ml = new MercadoLibre();        
        //Al iniciar el objeto UI en cualquier lugar, el formulario de busqueda funcionara en todas las paginas
        this.buscarForm.addEventListener('submit', () => {  
            this.buscarInput.name = "q";
            this.buscarForm.action = "search.html";
            this.buscarForm.method = "GET";            
        })
    }
    //Llena el div tendencias del index con palabras mas buscadas
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

    await this.mostrarProductos(json[Math.floor(Math.random() * 11)].keyword, 1)
    }

    //Llena el div productos de una busqueda, 
    //si tipo es 1 se llena por busqueda con palabra, si es 2 se llena por busqueda por categorias
    mostrarProductos = async (palabra, tipo) => {
        this.productos.innerHTML = '';    
    
        this.loader.classList.toggle('d-none');
        
        let json; 

        if(tipo === 1) {
            json = await this.ml.buscarProductos(palabra);
            this.productos.innerHTML = `<h4 class="col-12"><span class="text-muted">Mostrando resultados para: </span>${palabra}</h4>`;    
        }
        else if(tipo === 2)
            json = await this.ml.buscarProductosPorCategoria(palabra);
        
        this.loader.classList.add('d-none');                              
    
        if (json.hasOwnProperty("error"))
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

    //Agrega un objeto Product a localStorage
    agregarProductoCarrito = async (id) => {
        const product = new Product(id);

        await product.mapearProducto();
        delete product.mapearProducto;

        product['subtotal'] = 0;

        if(product.id !== 0){
            if(localStorage.getItem(id) === null) {
                product.quantity = 1;
                product.subtotal = product.price * product.quantity;
                alert(`AGREGADO: ${product.title}`);
                localStorage.setItem(id, JSON.stringify(product));
            }
            else{
                alert('Producto ya agregado a carrito');
            }                        
        }
    }

    //Llena el div cart de la pagina cart con los datos recabados en localStorage, tambien calcula total
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
                col1.setAttribute('class', 'col-md-5 d-flex align-items-center');

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

                let mas = document.createElement('button');
                mas.setAttribute('class', 'btn btn-lg btn-success my-3');
                mas.textContent = '+';
                mas.addEventListener('click', () => { this.sumarCantidadProducto(product.id) })

                let menos = document.createElement('button');
                menos.setAttribute('class', 'btn btn-lg btn-danger my-3 mx-3');
                menos.textContent = '-';
                menos.addEventListener('click', () => { this.restarCantidadProducto(product.id) })

                this.cart.appendChild(alert);
                alert.appendChild(button);
                alert.appendChild(row);

                col1.appendChild(a);
                a.appendChild(img);

                row.appendChild(col1);
                row.appendChild(col2);

                col2.innerHTML = productDetails;
                col2.appendChild(mas);
                col2.appendChild(menos);

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

    //Elimina un objeto Product especifico de localStorage
    eliminarProductoCarrito = (id) => {
        if(window.confirm('¿Seguro que deseas quitar este producto de tu carrito?')){
            localStorage.removeItem(id);
            this.total.innerHTML = '';
            this.cart.innerHTML = ''
            this.mostrarCarrito();
        }            
    }

    //Añade 1 al atributo quantity de un objeto Product especifico en localStorage
    sumarCantidadProducto = (id) => {
        let product = JSON.parse(localStorage.getItem(id));
        product.quantity++;
        product.subtotal = product.price * product.quantity;
        localStorage.setItem(id, JSON.stringify(product));
        this.cart.innerHTML = '';
        this.total.innerHTML = '';
        this.mostrarCarrito();
    }

    //Quita 1 al atributo quantity de un objeto Product especifico en localStorage
    restarCantidadProducto = (id) => {
        let product = JSON.parse(localStorage.getItem(id));
        if(product.quantity == 1)
            alert('La cantidad mínima de producto es 1')
        else
        product.quantity--;       
        product.subtotal = product.price * product.quantity;
        localStorage.setItem(id, JSON.stringify(product));
        this.cart.innerHTML = '';
        this.total.innerHTML = '';
        this.mostrarCarrito();
    }

    //Llena los elementos de la pagina product con la informacion de un producto en especifico
    mostrarProducto = async (id) => {
        let product = new Product(id);
        await product.mapearProducto();
        delete product.mapearProducto;
        console.log(product);

        this.productTitle.textContent = product.title;
        this.productPrice.textContent = formatter.format(product.price) + " " + product.currency_id;
        let date = new Date(product.updated)
        this.productUpdated.textContent = date.toLocaleDateString();
        this.productDescription.textContent = product.description;

        this.productAddCartBtn.addEventListener('click', () => {
            this.agregarProductoCarrito(product.id);
        })        

        let pictures = '';

        for (let i = 0; i < product.pictures.length; i++) {
            if(i == 0)            
                pictures += `
                <div class="carousel-item active">
                    <img class="d-block w-100" src="${product.pictures[i]}">
                </div>
                `;     
            else  
                pictures += `
                <div class="carousel-item">
                    <img class="d-block w-100" src="${product.pictures[i]}">
                </div>
                `;                      
        }

        this.productPictures.innerHTML = pictures;
    }

    //Llena el div categorias de la pagina categories


    //Muestra los productos

}
