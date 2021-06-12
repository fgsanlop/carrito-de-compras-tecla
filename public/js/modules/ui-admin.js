import Api from './api.js';
import Product from './product.js';

//Se usa para darle formato de dinero a los numeros
let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});    

export default class UI {
    //Obtiene los elementos de los distintos HTML donde se importe
    constructor(){        
        //Index y busqueda
        this.productos = document.getElementById('productos');
        this.loader = document.getElementById('loader');
        //Modificacion/Registro
        this.productDetail = document.getElementById('product-detail');
        this.productPicture = document.getElementById('product-picture');
        this.productTitle = document.getElementById('product-title');
        this.productDescription = document.getElementById('product-description');
        this.productCategory = document.getElementById('product-category');
        this.productPrice = document.getElementById('product-price');
        this.productPictureUrl = document.getElementById('product-picture-url');
        this.productStock = document.getElementById('product-stock');
        this.productID = document.getElementById('product-id');
        this.productUpdate = document.getElementById('product-update');
        //Objeto Api para las consultas
        this.api = new Api();        
        //Al iniciar el objeto UI en cualquier lugar, el formulario de busqueda funcionara en todas las paginas
        this.buscarInput = document.getElementById('buscar');
        this.buscarForm = document.getElementById('buscarForm');
        this.buscarForm.addEventListener('submit', () => {  
            this.buscarInput.name = "id";
            this.buscarForm.action = "product";
            this.buscarForm.method = "GET";                        
        })
    }
    //Llena el div tendencias del index con palabras mas buscadas
    
    mostrarTodosLosProductos = async () => {
        this.productos.innerHTML = '';    

        this.loader.classList.toggle('d-none');
        
        let json = await this.api.buscarTodosLosProductos();
        
        json = json.slice(0,20);

        console.log(json);

        this.loader.classList.add('d-none'); 
        
        if (json.hasOwnProperty("error"))
            this.productos.innerHTML += `<p class="col-12">${json.error}</h4>`;
        else {                     
            json.forEach(element => {     
                let col = document.createElement('div')
                col.setAttribute('class', 'col-sm-6 col-md-4 col-lg-3 mb-4');

                let card = document.createElement('div')
                card.setAttribute('class', 'card shadow-sm h-100');     

                let img = document.createElement('img')
                img.setAttribute('src', element.picture);
                img.setAttribute('class', 'card-img-top mx-auto');    

                let body = document.createElement('div');
                body.setAttribute('class', 'card-body');

                let title = document.createElement('p');
                title.setAttribute('class', 'card-title text-muted');
                title.textContent = element.title;

                let id = document.createElement('p');
                id.setAttribute('class', 'card-title text-muted');
                id.textContent = `ID: ${element.id}`;

                let text = document.createElement('h4');
                text.setAttribute('class', 'card-text');
                text.textContent = formatter.format(element.price);

                let stockQ = document.createElement('h5');
                stockQ.setAttribute('class', 'card-text text-primary');
                stockQ.textContent = `Stock: ${element.stock}`;

                let modificado = document.createElement('h6');
                modificado.setAttribute('class', 'card-text text-success');
                let fecha = new Date(element.updatedAt);
                let fechaTraducida = fecha.toLocaleString();
                modificado.textContent = `Modificado: ${fechaTraducida}`;            

                let footer = document.createElement('div');
                footer.setAttribute('class', 'card-footer text-center');        

                let button1 = document.createElement('a');
                button1.setAttribute('class', 'btn btn-info');
                button1.textContent = 'Modificar';
                button1.addEventListener('click', () => {
                    window.location = '/admin/product?id=' + element.id;
                })

                let button2 = document.createElement('button');
                button2.setAttribute('class', 'btn btn-danger ml-2');
                button2.setAttribute('id', element.id);
                button2.textContent = 'Eliminar';
                button2.addEventListener('click', () => {
                    Swal.fire({
                        title: `¿Deseas eliminar el siguiente producto (ID: ${element.id})?`,
                        text: element.title,
                        showDenyButton: true,
                        confirmButtonText: `Si`,
                        denyButtonText: `Cancelar`,
                      }).then(async (result) => {                        
                        if (result.isConfirmed) {
                            let producto = new Product(element.id);
                            let eliminarProducto = await producto.eliminarProducto();

                            if(eliminarProducto) {
                                Swal.fire('Producto eliminado', '', 'success');
                                this.productos.innerHTML = '';
                                this.mostrarTodosLosProductos();  
                            }
                            else
                                Swal.fire('Ocurrio un problema', '', 'error');
                                                    
                        }
                      })
                })

                body.appendChild(id);
                body.appendChild(title);
                body.appendChild(text);
                body.appendChild(stockQ);
                body.appendChild(modificado);

                footer.appendChild(button1);
                footer.appendChild(button2);                            

                card.appendChild(img);
                card.appendChild(body);
                card.appendChild(footer)

                col.appendChild(card)

                this.productos.appendChild(col)                           
            })
        }
    }

    llenarCategorias = async () => {
        let categorias = await this.api.obtenerCatergorias();
        categorias.forEach(element => {
            let opt = document.createElement('option');
            opt.textContent = element.name;
            opt.value = element.id;
            this.productCategory.appendChild(opt);
        });     
    }

    llenarDatosProducto = async (id) => {
        let producto = new Product(id);
        await producto.mapearProducto()
        
        if(producto.id == 0)
            this.productDetail.innerHTML = '<h1>Producto no encontrado :(</h1>';
        else {
            let categorias = await this.api.obtenerCatergorias();
            categorias.forEach(element => {
                let opt = document.createElement('option');
                opt.textContent = element.name;
                opt.value = element.id;
                this.productCategory.appendChild(opt);
            });  
            delete producto.mapearProducto;
            
            this.productID.innerHTML = `ID: ${producto.id}`;
            this.productUpdate.innerHTML = `Modificado: ${producto.updatedAt}`;
            this.productPicture.src = producto.picture; 
            this.productTitle.value = producto.title;
            this.productDescription.value = producto.description;
            this.productCategory.value = producto.category_id;
            this.productPrice.value = producto.price ;
            this.productPictureUrl.value = producto.picture;
            this.productStock.value = producto.stock;

            let modificarForm = document.getElementById('modificar');
            modificarForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                producto.title = this.productTitle.value;
                producto.category_id = this.productCategory.value;
                producto.description = this.productDescription.value;
                producto.price = this.productPrice.value;
                producto.picture = this.productPictureUrl.value;
                producto.stock = this.productStock.value;
                let modificarProducto = await producto.modificarProducto();
                if(modificarProducto == 'ok') {
                    Swal.fire(`Producto con ID: ${producto.id} modificado`, '', 'success');   
                    setTimeout(() => {
                        location.reload();
                    }, 2500);                   
                }
                else
                    Swal.fire('Ocurrio un problema en la modificación del producto', modificarProducto, 'error');
            })
        }                
    }

    formularioCrear = async () => {
        let crearForm = document.getElementById('crear');
        crearForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let producto = new Product(0);
            producto.title = this.productTitle.value;
            producto.category_id = this.productCategory.value;
            producto.description = this.productDescription.value;
            producto.price = this.productPrice.value;
            producto.picture = this.productPictureUrl.value;
            producto.stock = this.productStock.value;

            let crearProducto = await producto.crearProducto();
            
            if(crearProducto) {
                Swal.fire(`Producto creado`, '', 'success');   
                setTimeout(() => {
                    window.location = '/admin/index';
                }, 2500);                   
            }
            else
                Swal.fire('Ocurrio un problema en la creación del producto', '', 'error');
        })
    }

}
