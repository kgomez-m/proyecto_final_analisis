function editarVehiculo(id) {
    var index = id.textContent;    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:5000/api/project/pf_vehicle/"+index, requestOptions)
        .then(response => response.json())
        .then(data => {
            userVehicle = data.response[0]            
            const brand = window.prompt("Ingrese la marca del vehículo", userVehicle.brand);
            const model = window.prompt("Ingrese el modelo del vehículo", userVehicle.model);
            const year = window.prompt("Ingrese el año del vehículo", userVehicle.year);
            const type_vehicle = window.prompt("Ingrese el tipo del vehículo", userVehicle.type_vehicle);
            const color = window.prompt("Ingrese el color del vehículo", userVehicle.color);
            const plate = window.prompt("Ingrese la placa del vehículo", userVehicle.plate);
            const milieage = window.prompt("Ingrese el millaje del vehículo", userVehicle.milieage);
            const status = window.prompt("Ingrese el estatus del vehículo", userVehicle.status);
            const image = window.prompt("Ingrese la URL de la imagen del vehículo", userVehicle.image);
            const rental_fee = window.prompt("Ingrese el costo de la renta", userVehicle.rental_fee);            
            
            var confirmacion = window.confirm("¿Seguro que deseas editar el vehículo con id:"+ userVehicle.id_vehicle + " " + userVehicle.brand + " " + userVehicle.model);
        
            if (confirmacion) {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "brand": brand,
                    "model": model,
                    "year": year,
                    "type_vehicle": type_vehicle,
                    "color": color,
                    "plate": plate,
                    "milieage": milieage,
                    "status": status,
                    "image": image,
                    "rental_fee": rental_fee
                });        
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch(`http://localhost:5000/api/project/pf_vehicle/${index}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        window.alert("Vehículo editado");
                        window.location.href = "vehicle-list.html";
                    })
                    .catch(error => console.log('error', error));
            } else {
                window.alert("Edicion cancelada");
            }
        })
        .catch(error => console.log('error', error));
}
