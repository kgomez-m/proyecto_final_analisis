function editarRenta(id) {
    var index = id.textContent;    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:4000/api/project/pf_rent/"+index, requestOptions)
        .then(response => response.json())
        .then(data => {
            userRent = data.response[0]            
            const id_vehicle = window.prompt("Ingrese el ID del vehículo", userRent.id_vehicle);
            const end_milieage = window.prompt("Ingrese el millaje final", userRent.end_milieage);
            const rental_status = window.prompt("Ingrese el estado de la renta", userRent.rental_status);
            
            var confirmacion = window.confirm("¿Seguro que deseas editar la renta con id: "+ userRent.id_rent);
        
            if (confirmacion) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "id_vehicle": id_vehicle,
                    "end_milieage": end_milieage,
                    "rental_status": rental_status
                });        
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch(`http://localhost:4000/api/project/pf_rent/${index}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        window.alert("Renta editado");
                        window.location.href = "rental-list.html";
                    })
                    .catch(error => console.log('error', error));
            } else {
                window.alert("Edicion cancelada");
            }
        })
        .catch(error => console.log('error', error));
}
