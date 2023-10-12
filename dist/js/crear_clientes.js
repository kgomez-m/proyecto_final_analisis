document.getElementById("createButton").addEventListener("click", function () {
    var name = document.getElementById("nameInput").value;
    var lastname = document.getElementById("lastnameInput").value;
    var dpi = document.getElementById("dpiInput").value;
    var address = document.getElementById("addressInput").value;
    var email = document.getElementById("emailInput").value;
    var phone = document.getElementById("phoneInput").value;
    var nit = document.getElementById("nitInput").value;

  
    var clientData = {
        "name": name,
        "lastname": lastname,
        "dpi": dpi,
        "address": address,
        "email": email,
        "phone": phone,
        "nit": nit
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(clientData),
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/project/pf_client/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    $('#product_add_modal').modal('hide');
    window.location.href = "client.html";
});