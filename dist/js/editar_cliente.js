document.addEventListener('click', function (event) {

    if (event.target.id.startsWith('editButton')) {
        var buttonId = event.target.id;
        var index = buttonId.replace('editButton', '');
        console.log('Se hizo clic en el botón con índice ' + index);

        var name = document.getElementById("nameInputEdit" + index).value;
        var lastname = document.getElementById("lastnameInputEdit" + index).value;
        var dpi = document.getElementById("dpiInputEdit" + index).value;
        var address = document.getElementById("addressInputEdit" + index).value;
        var email = document.getElementById("emailInputEdit" + index).value;
        var phone = document.getElementById("phoneInputEdit" + index).value;
        var nit = document.getElementById("nitInputEdit" + index).value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "lastname": lastname,
            "dpi": dpi,
            "address": address,
            "email": email,
            "phone": phone,
            "nit": nit
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://localhost:4000/api/project/pf_client/${index}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        $('#editModal' + index).modal('hide');
        window.location.href = "client.html";
    }
});