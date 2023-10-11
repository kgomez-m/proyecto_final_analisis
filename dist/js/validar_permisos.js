function generar_menu(id_user) {
    const permissionToRouteMap = {
        PROFILE: 'profile.html',
        DASHBOARD: 'home.html',
        VEHICLE: 'vehicle.html',
        V_LIST: 'vehicle-list.html',
        CLIENT: 'client.html',
        RENTAL: 'rental.html',
        R_LIST: 'rental-list.html',
        R_INVOICE: 'rental-invoice.html',
        ADMINISTRATION: 'administration.html',
        A_ROLE: 'admin-role.html',
        A_USER: 'admin-user.html',

    };

    const menuContainer = document.getElementById('app_main-menu-wrapper');
    var requestOptions2 = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:5000/api/project/pf_user/permission-by-iduser/${id_user}`, requestOptions2)
        .then(response => response.json())
        .then(data2 => {
            const apiPermissions = data2.response;

            function createMenuItem(permission) {
                const link = document.createElement('a');
                link.textContent = permission.name;
                // Obtener la ruta del objeto permissionToRouteMap o usar "index.html" si no está definida
                link.href = permissionToRouteMap[permission.id_permission] || 'index.html';
                return link;
            }

            function createSubMenu(permissions) {
                const subMenu = document.createElement('ul');
                permissions.forEach(subPermission => {
                    const subMenuItem = document.createElement('li');
                    subMenuItem.appendChild(createMenuItem(subPermission));
                    subMenu.appendChild(subMenuItem);
                });
                return subMenu;
            }

            apiPermissions.forEach(permission => {
                if (permissionToRouteMap.hasOwnProperty(permission.id_permission)) {
                    const link = createMenuItem(permission);
                    const listItem = document.createElement('li');

                    listItem.appendChild(link);

                    if (permission.level2) {
                        const subMenu = createSubMenu(permission.level2);
                        listItem.appendChild(subMenu);
                    }

                    menuContainer.querySelector('ul').appendChild(listItem);
                }
            });
        })
        .catch(error => console.log('error', error));
}
