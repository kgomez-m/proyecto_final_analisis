var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:5000/api/project/pf_client/", requestOptions)
    .then(response => response.json())
    .then(data => {
        var clientTableBody = document.getElementById("clientTableBody");
        var togglebuttonTemplate = document.querySelector(".togglebutton").cloneNode(true);

        var oddRow = document.querySelector('tr.odd');
        if (oddRow) {
            oddRow.remove();
        }

        data.response.forEach(client => {
            var row = document.createElement("tr");

            var checkboxCell = document.createElement("td");
            checkboxCell.className = "checkbox-cell";
            var checkbox = document.createElement("span");
            checkbox.className = "checkbox";
            var label = document.createElement("label");
            var checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            label.appendChild(checkboxInput);
            var checkboxMaterial = document.createElement("span");
            checkboxMaterial.className = "checkbox-material";
            label.appendChild(checkboxMaterial);
            checkbox.appendChild(label);
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            var imageCell = document.createElement("td");
            var image = document.createElement("img");
            image.src = "assets/img/ecom/products/12252_Tgi0.jpeg";
            image.alt = "Client Image";
            image.className = "img-thumbnail";
            imageCell.appendChild(image);
            row.appendChild(imageCell);

            var idClientCell = document.createElement("td");
            idClientCell.textContent = client.id_client;
            row.appendChild(idClientCell);

            var nameCell = document.createElement("td");
            nameCell.textContent = client.name;
            row.appendChild(nameCell);

            var lastnameCell = document.createElement("td");
            lastnameCell.textContent = client.lastname;
            row.appendChild(lastnameCell);

            var emailCell = document.createElement("td");
            emailCell.textContent = client.email;
            row.appendChild(emailCell);

            var editCell = document.createElement("td");
            var editLink = document.createElement("a");
            editLink.href = "#"
            editLink.id = "edit-button"
            editLink.setAttribute("data-clientid", client.id_client);
            editLink.className = "edit-product icon";
            editLink.setAttribute("data-toggle", "modal");
            editLink.setAttribute("data-target", "#editModal" + client.id_client);
            var editIcon = document.createElement("i");
            editIcon.className = "zmdi zmdi-edit";
            editLink.appendChild(editIcon);
            editCell.appendChild(editLink);
            row.appendChild(editCell);

            var deleteCell = document.createElement("td");
            var deleteLink = document.createElement("a");
            deleteLink.href = "#"
            deleteLink.id = "delete-button"
            deleteLink.setAttribute("data-clientid", client.id_client);
            deleteLink.className = "edit-product icon";
            deleteLink.setAttribute("data-toggle", "modal");
            deleteLink.setAttribute("data-target", "#deleteModal" + client.id_client);
            var deleteIcon = document.createElement("i");
            deleteIcon.className = "zmdi zmdi-delete";
            deleteLink.appendChild(deleteIcon);
            deleteCell.appendChild(deleteLink);
            row.appendChild(deleteCell);

            clientTableBody.appendChild(row);
        });
    })
    .catch(error => console.log('error', error));