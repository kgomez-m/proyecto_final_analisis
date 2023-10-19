function editarVehiculo(id) {
    var index = id.textContent;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:5000/api/project/pf_vehicle/"+index, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data && data.response && Array.isArray(data.response)) {
                const resultCount = data.response.length;
                console.log(`Número de resultados: ${resultCount}`);

                for (var i = 0; i < resultCount; i++) {
                    var userVehicle = data.response[i];
                    createModal(userVehicle, i);
                }
            } else {
                console.log('La respuesta no tiene la estructura esperada.');
            }
        })
        .catch(error => console.log('error', error));
    
    function createModal(userVehicle, index) {
        var modalId = "editModal" + userVehicle.id_vehicle;
        console.log(modalId)

        var modalDiv = document.createElement('div');
        modalDiv.classList.add('modal', 'fade');
        modalDiv.id = modalId;
        modalDiv.setAttribute('tabindex', '-1');
        modalDiv.setAttribute('role', 'dialog');
        modalDiv.setAttribute('aria-labelledby', 'tab_modal');
        console.log("Si lo crea")

        modalDiv.innerHTML = `
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header p-b-15">
                    <h4 class="modal-title">Datos del Cliente</h4>
                    <ul class="card-actions icons right-top">
                        <a href="javascript:void(0)" data-dismiss="modal" class="text-white" aria-label="Close">
                            <i class="zmdi zmdi-close"></i>
                        </a>
                    </ul>
                </div>
                <div class="modal-body p-0">
                    <div class="tabpanel">
                        <ul class="nav nav-tabs p-0">
                            <li class="active" role="presentation"><a href="#editModal${userVehicle.id_vehicle}" data-toggle="tab" aria-expanded="true">Información básica</a></li>
                        </ul>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane fadeIn active" id="editModal${userVehicle.id_vehicle}">
                            <div class="card card p-20 p-t-10 m-b-0">
                                <div class="card-body">
                                    <form class="form-horizontal">
                                    <div class="form-group label-floating is-focused">
                                            <label class="control-label">ID Cliente</label>
                                            <input id="idInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.id_vehicle}" readonly>
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                            <label class="control-label">Nombres</label>
                                            <input id="nameInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.brand}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">Apellidos</label>
                                        <input id="lastnameInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.model}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">DPI</label>
                                        <input id="dpiInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.year}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">Dirección</label>
                                        <input id="addressInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.type_vehicle}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">Correo</label>
                                        <input id="emailInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.color}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">Teléfono</label>
                                        <input id="phoneInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.plate}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">NIT</label>
                                        <input id="nitInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.milieage}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">NIT</label>
                                        <input id="nitInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.status}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">NIT</label>
                                        <input id="nitInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.image}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">NIT</label>
                                        <input id="nitInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.rental_fee}">
                                        </div>
                                        <div class="form-group label-floating is-focused">
                                        <label class="control-label">NIT</label>
                                        <input id="nitInputEdit${userVehicle.id_vehicle}" type="text" class="form-control" value="${userVehicle.created}">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                        <button value="${userVehicle.id_vehicle}" id="editButton${userVehicle.id_vehicle}" type="button" class="btn btn-primary">Modificar</button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.appendChild(modalDiv);
        console.log("llego al end")
    }
}