$(document).ready(function () {
  fetch(`http://localhost:4000/api/project/pf_vehicle/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud de la API falló');
      }
      return response.json();
    })
    .then(data => {
      // Obtén una referencia al elemento donde deseas mostrar los resultados
      const vehicleInfo = document.getElementById('vehicleInfo');

      // Limpia el contenido existente en caso de que ya se haya cargado información previamente
      vehicleInfo.innerHTML = '';
      var fecha;
      var fechaFormato;
      var fechaFormateada;
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      var i = 1;

      // Recorre los elementos en la respuesta y agrégalos al elemento "vehicleInfo"
      data.response.forEach(vehicle => {
        fecha = vehicle.created;
        fechaFormato = new Date(fecha)
        fechaFormateada = fechaFormato.toLocaleDateString(undefined, options);

        vehicleInfo.innerHTML += `
          <tr >
          <td id="id_vehicle${i}">${vehicle.id_vehicle}</td>
          <td>${vehicle.brand}</td>
          <td>${vehicle.model}</td>
          <td>${vehicle.year}</td>
          <td>${vehicle.color}</td>
          <td>${vehicle.plate}</td>
          <td>${vehicle.milieage}</td>
          <td>${vehicle.status}</td>
          <td><img src="${vehicle.image}" alt="" class="img-thumbnail" /></td>
          <td>Q.${vehicle.rental_fee}</td>
          <td>${fechaFormateada}</td>
          <td>
            <a href="javascript:void(0)" class="icon edit-product" onclick="editarVehiculo(id_vehicle${i})" id="openModalElement">
            <i class="zmdi zmdi-edit" id="edit" id="openModalElement"></i>
            </a>
            <a href="javascript:void(0)" class="icon edit-product" data-drawer="open-right-lg" onclick="eliminarVehiculo(id_vehicle${i})">
              <i class="zmdi zmdi-delete" id="delete"></i>
            </a>
          </td>
          </tr>`;
        // $("#vehicleInfo").append(`
        // <tr >
        // <td id="id_vehicle${i}">${vehicle.id_vehicle}</td>
        // <td>${vehicle.brand}</td>
        // <td>${vehicle.model}</td>
        // <td>${vehicle.year}</td>
        // <td>${vehicle.color}</td>
        // <td>${vehicle.plate}</td>
        // <td>${vehicle.milieage}</td>
        // <td>${vehicle.status}</td>
        // <td><img src="${vehicle.image}" alt="" class="img-thumbnail" /></td>
        // <td>Q.${vehicle.rental_fee}</td>
        // <td>${fechaFormateada}</td>
        // <td>
        //   <a href="javascript:void(0)" class="icon edit-product" onclick="editarVehiculo(id_vehicle${i})" id="openModalElement">
        //   <i class="zmdi zmdi-edit" id="edit" id="openModalElement"></i>
        //   </a>
        //   <a href="javascript:void(0)" class="icon edit-product" data-drawer="open-right-lg" onclick="eliminarVehiculo(id_vehicle${i})">
        //     <i class="zmdi zmdi-delete" id="delete"></i>
        //   </a>
        // </td>
        // </tr>`)
        i++;
      });
      $('#productsTable').DataTable({
        searching: true
      });
    })
    .catch(error => {
      console.error('Error al obtener información de vehículos:', error);
    });
  
});