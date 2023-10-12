document.addEventListener('click', function (event) {

    if (event.target.id.startsWith('editButton')) {
        var buttonId = event.target.id;
        var index = buttonId.replace('editButton', '');
        console.log('Se hizo clic en el botón con índice ' + index);

        var id_rol = document.getElementById("idRolInputEdit" + index).value;
        var name = document.getElementById("nameInputEdit" + index).value;
        var email = document.getElementById("emailInputEdit" + index).value;
        var user = document.getElementById("phoneInputEdit" + index).value;
        var password = document.getElementById("nitInputEdit" + index).value;
        var active = document.getElementById("estadoInputEdit" + index).value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_rol": id_rol,
            "name": name,
            "email": email,
            "user": user,
            "password": password,
            "active": active
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://localhost:5000/api/project/pf_user/${index}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        $('#editModal' + index).modal('hide');
        window.location.href = "admin-user.html";
    }
});