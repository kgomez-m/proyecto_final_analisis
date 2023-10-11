function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/api/project/pf_user/login", requestOptions)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.response) && data.response.length > 0) {
                var userData = data.response[0];

                alert("Bienvenido " + userData.user);
                window.location.href = "home.html";

                localStorage.setItem('id_user', userData.id_user);
                localStorage.setItem('username', userData.user);
                localStorage.setItem('id_rol', userData.id_rol);

            } else {
                alert("Verifica tus credenciales.");
            }
        })
        .catch(error => console.log('Error:', error));
}