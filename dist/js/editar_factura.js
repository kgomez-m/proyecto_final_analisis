function editarFactura(id) {
    var index = id.textContent;    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost:4000/api/project/pf_billing/"+index, requestOptions)
        .then(response => response.json())
        .then(data => {
            billData = data.response[0]            
            const payment_method = window.prompt("Ingrese el metodo de pago", billData.payment_method);
            const rental_details = window.prompt("Ingrese el detalle de la renta", billData.rental_details);
            const status = window.prompt("Ingrese el estado", billData.status);
            
            var confirmacion = window.confirm("¿Seguro que deseas editar la renta con id: "+ billData.id_billing);
        
            if (confirmacion) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "payment_method": payment_method,                    
                    "rental_details": rental_details,
                    "status": status
                });        
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch(`http://localhost:4000/api/project/pf_billing/${index}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        window.alert("Factura editada");
                        window.location.href = "rental-invoice.html";
                    })
                    .catch(error => console.log('error', error));
            } else {
                window.alert("Edicion cancelada");
            }
        })
        .catch(error => console.log('error', error));
}
