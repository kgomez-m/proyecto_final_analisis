function eliminarRenta(id) {
    var index = id.textContent;
    var confirmacion = window.confirm("¿Seguro que deseas eliminar esta renta?");

    if (confirmacion) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:4000/api/project/pf_rent/${index}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                window.alert("Renta eliminada");
                window.location.href = "rental-list.html";
            })
            .catch(error => console.log('error', error));
    } else {
        window.alert("Eliminación cancelada");
    }
}
