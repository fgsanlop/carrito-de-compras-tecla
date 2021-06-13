import Purchases from './modules/purchase.js';
const tabla = document.getElementById('purchases');

let compras = await Purchases.listarCompras();

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  
if(compras.hasOwnProperty('error')) {
    Swal.fire({
        title: 'Ups',
        icon: 'warning',
        text: compras.error
    })
}
else {
    compras.forEach(compra => {        
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');
        td1.innerHTML = compra.id;
        tr.appendChild(td1);
        
        let td2 = document.createElement('td');
        let fecha = new Date(compra.createdAt)
        td2.innerHTML = fecha.toLocaleString();
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerHTML = compra.address;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerHTML = compra.city;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.innerHTML = compra.zipcode;
        tr.appendChild(td5);
        
        let td6 = document.createElement('td');
        td6.innerHTML = compra.method;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.setAttribute('class','text-primary')
        td7.innerHTML = formatter.format(compra.total);
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        let btnDetalles = document.createElement('button');
        btnDetalles.setAttribute('class', 'btn btn-info');
        btnDetalles.textContent = '?';
        
        btnDetalles.addEventListener('click', () => {
            console.log(compra.purchases_details)
            let filaDetalle = '';
            compra.purchases_details.forEach(element => {
                filaDetalle += `
                <tr>
                    <td>${element.product_title}</td>
                    <td>${formatter.format(element.price)}</td>
                    <td>${element.quantity}</td>
                    <td class="text-primary">${formatter.format(element.subtotal)}</td>
                </tr>
                `
            });
            console.log(filaDetalle);
            Swal.fire({
                title: `Total: ${formatter.format(compra.total)} (ID: ${compra.id})`,                
                width: '90%',
                html: `
                <table class="table my-4">
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                    ${filaDetalle}
                </table>
                `
            })
        })
        td8.appendChild(btnDetalles);        
        tr.appendChild(td8);

        tabla.appendChild(tr);

        
    });
}


