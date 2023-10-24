function buscar_usuario(id_user) {    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(`http://localhost:4000/api/project/pf_user/${id_user}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.status === 200 && data.success) {
                console.log(data);
                const userData = data.response[0];
                const nameElements = document.querySelectorAll('.name');
                const profileInitias = document.querySelectorAll('.avatar');
                const metaNav = document.querySelectorAll('.meta');
                const caretAvatar = document.querySelectorAll('.caret');
                $(metaNav).css({display: "flex", position: "relative", width: "160px"});
                $(caretAvatar).css({bottom: "22px", position: "absolute", right: "-4px"});
                profileInitias.innerHTML = "";
                // <i class="badge mini success status"></i>
                nameElements.forEach(element => {
                    element.textContent = userData.name;
                });
                profileInitias.forEach(element => {
                    element.innerHTML = `<div class="profile-initials" style="width: 45px; height: 45px; background: #919191; border-radius: 50%; color: #fff; padding: 0px; font-size: 20px;">${userData.name[0]}</div><i style="top: 3px; left: 33px;" class="badge mini success status"></i>`;
                });
                const titleElement = document.querySelector('.title');
                if(titleElement) titleElement.textContent = userData.name_rol;
                
                var requestOptions2 = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(`http://localhost:4000/api/project/pf_user/permission-by-iduser/${id_user}`, requestOptions2)
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