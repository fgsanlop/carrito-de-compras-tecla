class Producto {
    constructor(nombre, precio, imagen, descripcion, cantidad, color, categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.color = color;
        this.categoria = categoria;
    }       

    comprarProducto(cantidad, producto){
        //restar n producto a cantidad
        //validar existencias
    }

    añadirProductos(cantidad){
        //agregar productos a stock
    }    
}

class Cliente {
    constructor(nombre, apellido, email, contraseña, direccion, lista, historial){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.lista = lista;
        this.historial = historial;
    }

    añadirProductoLista(){

    }

    quitarProductoLista(){
        
    }
    
    realizarCompra(){

    }
}



