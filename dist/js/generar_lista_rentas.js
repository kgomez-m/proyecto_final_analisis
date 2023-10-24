fetch(`http://localhost:5000/api/project/pf_rent`)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud de la API falló');
    }
    return response.json();
  })
  .then(data => {
    // Obtén una referencia al elemento donde deseas mostrar los resultados
    const RentaInfo = document.getElementById('RentaInfo');
    
    // Limpia el contenido existente en caso de que ya se haya cargado información previamente
    RentaInfo.innerHTML = '';
    var fechaRentaInicio;    
    var fechaFormatoRentaInicio;
    var fechaFormateadaRentaInicio;
    var fechaRentaFinal;
    var fechaFormatoRentaFinal;
    var fechaFormateadaRentaFinal;
    var fechaModificacion;    
    var fechaFormatoModificacion;
    var fechaFormateadaModificacion;
    var fechaCreacion;
    var fechaFormatoCreacion;
    var fechaFormateadaCreacion;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    var i = 1;

    // Recorre los elementos en la respuesta y agrégalos al elemento "RentaInfo"
    data.response.forEach(rent => {
      fechaRentaInicio = rent.rental_init_date;
      fechaFormatoRentaInicio = new Date(fechaRentaInicio)
      fechaFormateadaRentaInicio = fechaFormatoRentaInicio.toLocaleDateString(undefined, options);

      fechaRentaFinal = rent.rental_end_date;
      fechaFormatoRentaFinal = new Date(fechaRentaFinal)
      fechaFormateadaRentaFinal = fechaFormatoRentaFinal.toLocaleDateString(undefined, options);

      fechaModificacion = rent.modified;
      fechaFormatoModificacion = new Date(fechaModificacion)
      fechaFormateadaModificacion = fechaFormatoModificacion.toLocaleDateString(undefined, options);

      fechaCreacion = rent.created;
      fechaFormatoCreacion = new Date(fechaCreacion)
      fechaFormateadaCreacion = fechaFormatoCreacion.toLocaleDateString(undefined, options);

      RentaInfo.innerHTML += `
        <tr >
        <td id="id_rent${i}">${rent.id_rent}</td>
        <td>${rent.id_client}</td>
        <td>${rent.client_name}</td>        
        <td>${rent.vehicle}</td>
        <td>${fechaFormateadaRentaInicio}</td>
        <td>${fechaFormateadaRentaFinal}</td>
        <td>${rent.init_milieage}</td>
        <td>${rent.end_milieage}</td>
        <td>Q.${rent.total_rate}</td>
        <td>${rent.rental_status}</td>
        <td>${fechaFormateadaCreacion}</td>
        <td>${fechaFormateadaModificacion}</td>
        <td>
          <a href="javascript:void(0)" class="icon edit-product" onclick="editarRenta(id_rent${i})" id="openModalElement">
          <i class="zmdi zmdi-edit" id="edit" id="openModalElement"></i>
          </a>
        </td>
        <td>
          <a href="javascript:void(0)" class="icon edit-product" data-drawer="open-right-lg" onclick="eliminarRenta(id_rent${i})">
            <i class="zmdi zmdi-delete" id="delete"></i>
          </a>
        </td>
        </tr>`;
        i++;
    });
  })
  .catch(error => {
    console.error('Error al obtener información de vehículos:', error);
  });