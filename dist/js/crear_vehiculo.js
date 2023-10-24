document.getElementById("createButton").addEventListener("click", function () {

    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var anio = document.getElementById("anio").value;
    var color = document.getElementById("color").value;
    var placa = document.getElementById("placa").value;
    var millaje = document.getElementById("millaje").value;
    var estado = document.getElementById("estado").value;
    var linkImagen = document.getElementById("linkImagen").value;
    var recargo = document.getElementById("recargo").value;
    var estatus = document.getElementById("status").value;
    var type_vehicle = document.getElementById("type_vehicle").value;

    var vehicleData = {
        "brand": marca,
        "model": modelo,
        "year": anio,
        "color": color,
        "plate": placa,
        "milieage": millaje,
        "estado": estado,
        "image": linkImagen,
        "rental_fee": recargo,
        "status": estatus,
        "type_vehicle": type_vehicle
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(vehicleData),
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/project/pf_vehicle/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    $('#product_add_modal').modal('hide');
    window.location.href = "vehicle-list.html";
});