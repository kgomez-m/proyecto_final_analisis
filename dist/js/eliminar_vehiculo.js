function eliminarVehiculo(id) {
    var index = id.textContent;
    var confirmacion = window.confirm("¿Seguro que deseas eliminar este vehículo?");

    if (confirmacion) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:4000/api/project/pf_vehicle/${index}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                window.alert("Vehículo eliminado");
                window.location.href = "vehicle-list.html";
            })
            .catch(error => console.log('error', error));
    } else {
        window.alert("Eliminación cancelada");
    }
}
