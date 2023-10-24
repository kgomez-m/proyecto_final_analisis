fetch(`http://localhost:5000/api/project/pf_billing/`)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud de la API falló');
    }
    return response.json();
  })
  .then(data => {
    // Obtén una referencia al elemento donde deseas mostrar los resultados
    const FacturaInfo = document.getElementById('FacturaInfo');
    
    // Limpia el contenido existente en caso de que ya se haya cargado información previamente
    FacturaInfo.innerHTML = '';
    var fechaModificacion;    
    var fechaFormatoModificacion;
    var fechaFormateadaModificacion;
    var fechaCreacion;
    var fechaFormatoCreacion;
    var fechaFormateadaCreacion;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    var i = 1;

    // Recorre los elementos en la respuesta y agrégalos al elemento "FacturaInfo"
    data.response.forEach(billing => {
      fechaModificacion = billing.modified;
      fechaFormatoModificacion = new Date(fechaModificacion)
      fechaFormateadaModificacion = fechaFormatoModificacion.toLocaleDateString(undefined, options);

      fechaCreacion = billing.invoice_created;
      fechaFormatoCreacion = new Date(fechaCreacion)
      fechaFormateadaCreacion = fechaFormatoCreacion.toLocaleDateString(undefined, options);

      FacturaInfo.innerHTML += `
        <tr >
        <td id="id_billing${i}">${billing.id_billing}</td>
        <td>${billing.id_client}</td>
        <td>${billing.client_name}</td>
        <td>${billing.payment_method}</td>
        <td>${fechaFormateadaCreacion}</td>
        <td>${billing.invoice_status}</td>
        <td>Q.${billing.total_to_pay}</td>        
        <td>${fechaFormateadaModificacion}</td>
        <td>
          <a href="javascript:void(0)" class="icon edit-product" onclick="editarFactura(id_billing${i})" id="openModalElement">
          <i class="zmdi zmdi-edit" id="edit" id="openModalElement"></i>
          </a>
        </td>
        <td>
          <a href="javascript:void(0)" class="icon edit-product" data-drawer="open-right-lg" onclick="eliminarFactura(id_billing${i})">
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