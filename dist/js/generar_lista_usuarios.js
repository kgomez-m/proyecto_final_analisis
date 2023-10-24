$(document).ready(function () {
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:5000/api/project/pf_user/", requestOptions)
    .then(response => response.json())
    .then(data => {
        var clientTableBody = document.getElementById("userTableBody");
        var togglebuttonTemplate = document.querySelector(".togglebutton").cloneNode(true);

        var oddRow = document.querySelector('tr.odd');
        if (oddRow) {
            oddRow.remove();
        }

        data.response.forEach(client => {
            var row = document.createElement("tr");

            var idUserCell = document.createElement("td");
            idUserCell.textContent = client.id_user;
            row.appendChild(idUserCell);

            var rolCell = document.createElement("td");
            var rol = "";
            if (client.id_rol === 1) {
                rol = "Admin";
            } else {
                rol = "Empleado";
            }
            rolCell.textContent = rol;
            row.appendChild(rolCell);

            var nameCell = document.createElement("td");
            nameCell.textContent = client.name;
            row.appendChild(nameCell);

            var usernameCell = document.createElement("td");
            usernameCell.textContent = client.user;
            row.appendChild(usernameCell);

            var stateCell = document.createElement("td");
            var estado = "";
            if (client.active === 1) {
                estado = "Activo";
            } else {
                estado = "Inactivo";
            }
            stateCell.textContent = estado;
            row.appendChild(stateCell);

            var editCell = document.createElement("td");
            var editLink = document.createElement("a");
            editLink.href = "#"
            editLink.id = "edit-button"
            editLink.setAttribute("data-clientid", client.id_user);
            editLink.className = "edit-product icon";
            editLink.setAttribute("data-toggle", "modal");
            editLink.setAttribute("data-target", "#editModal" + client.id_user);
            var editIcon = document.createElement("i");
            editIcon.className = "zmdi zmdi-edit";
            editLink.appendChild(editIcon);
            editCell.appendChild(editLink);
            row.appendChild(editCell);

            var deleteCell = document.createElement("td");
            var deleteLink = document.createElement("a");
            deleteLink.href = "#"
            deleteLink.id = "delete-button"
            deleteLink.setAttribute("data-clientid", client.id_user);
            deleteLink.className = "edit-product icon";
            deleteLink.setAttribute("data-toggle", "modal");
            deleteLink.setAttribute("data-target", "#deleteModal" + client.id_user);
            var deleteIcon = document.createElement("i");
            deleteIcon.className = "zmdi zmdi-delete";
            deleteLink.appendChild(deleteIcon);
            deleteCell.appendChild(deleteLink);
            // row.appendChild(deleteCell);

            clientTableBody.appendChild(row);            
        });
        $('#productsTable').DataTable({
            searching: true
        });
    })
    .catch(error => console.log('error', error));
});