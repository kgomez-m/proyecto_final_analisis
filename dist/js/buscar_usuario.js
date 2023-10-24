function buscar_usuario(id_user) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(`http://localhost:5000/api/project/pf_user/${id_user}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.success) {
                const userData = data.response[0];
                const nameElements = document.querySelectorAll('.name');
                nameElements.forEach(element => {
                    element.textContent = userData.name;
                });
                const titleElement = document.querySelector('.title');
                titleElement.textContent = userData.name_rol;

                var requestOptions2 = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(`http://localhost:5000/api/project/pf_user/permission-by-iduser/${id_user}`, requestOptions2)
                    .then(response => response.json())
                    .then(data2 => {
                        const permissions = data2.response;
                        permissions.forEach(permission => {
                            // console.log(permission.id_permission);
                            if (permission.level2 && Array.isArray(permission.level2)) {
                                permission.level2.forEach(subPermission => {
                                    // console.log(subPermission.id_permission);
                                });
                            }
                        });
                    })
                    .catch(error => console.log('error', error));

            }
        })
        .catch(error => console.log('Error:', error));
}