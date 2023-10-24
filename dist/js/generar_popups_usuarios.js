var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
const select_rol = document.getElementById('idRolInput');
let rol_filtered = []
fetch(`http://localhost:4000/api/project/pf_rol`)
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud de la API falló');
        }
        return response.json();
    })
    .then(data => {
        rol_filtered = data.response;
    })
    .catch(error => {
        console.error('Error al obtener información de vehículos:', error);
    });

fetch("http://localhost:4000/api/project/pf_user/", requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        if (data && data.response && Array.isArray(data.response)) {
            const resultCount = data.response.length; // Count the number of items in the "response" array
            console.log(`Número de resultados: ${resultCount}`);

            // Loop through the data and create modals
            for (var i = 0; i < resultCount; i++) {
                var userData = data.response[i];
                createModal(userData, i);
            }
        } else {
            console.log('La respuesta no tiene la estructura esperada.');
        }
    })
    .catch(error => console.log('error', error));

// Función para crear un modal
function createModal(userData, index) {
    var modalId = "editModal" + userData.id_user;

    var modalDiv = document.createElement('div');
    modalDiv.classList.add('modal', 'fade');
    modalDiv.id = modalId;
    modalDiv.setAttribute('tabindex', '-1');
    modalDiv.setAttribute('role', 'dialog');
    modalDiv.setAttribute('aria-labelledby', 'tab_modal');

    modalDiv.innerHTML = `
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header p-b-15">
                <h4 class="modal-title">Datos del Usuario</h4>
                <ul class="card-actions icons right-top">
                    <a href="javascript:void(0)" data-dismiss="modal" class="text-white" aria-label="Close">
                        <i class="zmdi zmdi-close"></i>
                    </a>
                </ul>
            </div>
            <div class="modal-body p-0">
                <div class="tabpanel">
                    <ul class="nav nav-tabs p-0">
                        <li class="active" role="presentation"><a href="#editModal${userData.id_user}" data-toggle="tab" aria-expanded="true">Información básica</a></li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fadeIn active" id="editModal${userData.id_user}">
                        <div class="card card p-20 p-t-10 m-b-0">
                            <div class="card-body">
                                <form class="form-horizontal">
                                  <div class="form-group label-floating is-focused">
                                        <label class="control-label">ID Usuario</label>
                                        <input id="idInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.id_user}" readonly>
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                        <select class="select form-control" name="idRolInputEdit" id="idRolInputEdit">
                                            <option value="">Selecciona un rol</option>
                                            ${rol_selected(userData.id_user)}
                                        </select>
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                        <label class="control-label">Nombres</label>
                                        <input id="nameInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.name}">
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                      <label class="control-label">Correo</label>
                                      <input id="emailInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.email}">
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                      <label class="control-label">Usuario</label>
                                      <input id="phoneInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.user}">
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                      <label class="control-label">Contraseña</label>
                                      <input id="nitInputEdit${userData.id_user}" type="password" class="form-control" value="${userData.password}">
                                    </div>
                                    <div class="form-group label-floating is-focused">
                                      <label class="control-label">Estado</label>
                                      <input id="estadoInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.active}">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                    <button value="${userData.id_user}" id="editButton${userData.id_user}" type="button" class="btn btn-primary">Modificar</button>
                </div>
            </div>
        </div>
    </div>`;

    document.body.appendChild(modalDiv);



    var modalId2 = "deleteModal" + userData.id_user;

    var modalDiv2 = document.createElement('div');
    modalDiv2.classList.add('modal', 'fade');
    modalDiv2.id = modalId2;
    modalDiv2.setAttribute('tabindex', '-1');
    modalDiv2.setAttribute('role', 'dialog');
    modalDiv2.setAttribute('aria-labelledby', 'tab_modal');

    modalDiv2.innerHTML = `
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
      <div class="modal-header p-b-15">
          <h4 class="modal-title">Datos del Usuario</h4>
          <ul class="card-actions icons right-top">
              <a href="javascript:void(0)" data-dismiss="modal" class="text-white" aria-label="Close">
                  <i class="zmdi zmdi-close"></i>
              </a>
          </ul>
      </div>
      <div class="modal-body p-0">
          <div class="tabpanel">
              <ul class="nav nav-tabs p-0">
                  <li class="active" role="presentation"><a href="#deleteModal${userData.id_user}" data-toggle="tab" aria-expanded="true">Eliminará a este usuario ¿está seguro?</a></li>
              </ul>
          </div>
          <div class="tab-content">
              <div class="tab-pane fadeIn active" id="deleteModal${userData.id_user}">
                  <div class="card card p-20 p-t-10 m-b-0">
                      <div class="card-body">
                          <form class="form-horizontal">
                          <div class="form-group label-floating is-focused">
                          <label class="control-label">ID Usuario</label>
                          <input id="idInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.id_user}" readonly>
                      </div>
                      <div class="form-group label-floating is-focused">
                          <label class="control-label">ID Rol</label>
                          <input id="idInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.id_rol}" readonly>
                      </div>
                      <div class="form-group label-floating is-focused">
                          <label class="control-label">Nombres</label>
                          <input id="nameInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.name}" readonly>
                      </div>
                      <div class="form-group label-floating is-focused">
                        <label class="control-label">Correo</label>
                        <input id="emailInputEdit${userData.id_user}" type="text" class="form-control" value="${userData.email}" readonly>
                      </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
              <button value="${userData.id_user}" id="deleteButton${userData.id_user}" type="button" class="btn btn-primary">Eliminar</button>
          </div>
      </div>
  </div>
</div>`;

    document.body.appendChild(modalDiv2);
}


function rol_selected(_id_rol) {
    let options_selected = "";
    rol_filtered.forEach(option => {
        if (option.id_rol == _id_rol) {
            options_selected += `<option value="${option.id_rol}" selected>${option.name}</option>`
        } else {            
            options_selected += `<option value="${option.id_rol}">${option.name}</option>`
        }        
    })

    return options_selected;
        
}