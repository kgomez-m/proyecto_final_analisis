document.getElementById("createButton").addEventListener("click", function () {
    var id_rol = document.getElementById("idRolInput").value;
    var name = document.getElementById("nameInput").value;
    var email = document.getElementById("emailInput").value;
    var user = document.getElementById("userInput").value;
    var password = document.getElementById("passwordInput").value;


    var clientData = {
        "id_rol": id_rol,
        "name": name,
        "email": email,
        "user": user,
        "password": password
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(clientData),
        redirect: 'follow'
    };

    fetch("http://localhost:4000/api/project/pf_user/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    $('#product_add_modal').modal('hide');
    window.location.href = "admin-user.html";
});