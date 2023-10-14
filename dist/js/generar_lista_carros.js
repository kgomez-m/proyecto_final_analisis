fetch(`http://localhost:5000/api/project/pf_vehicle/`)
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

    // Recorre los elementos en la respuesta y agrégalos al elemento "vehicleInfo"
    data.response.forEach(vehicle => {
      vehicleInfo.innerHTML += `
        <tr >
        <td>${vehicle.id_vehicle}</td>
        <td>${vehicle.brand}</td>
        <td>${vehicle.model}</td>
        <td>${vehicle.year}</td>
        <td>${vehicle.color}</td>
        <td>${vehicle.plate}</td>
        <td>${vehicle.milieage}</td>
        <td>${vehicle.status}</td>
        <td><img src="${vehicle.image}" alt="" class="img-thumbnail" /></td>
        <td>Q.${vehicle.rental_fee}</td>
        <td>${vehicle.created}</td>
        <td><a href="javascript:void(0)" class="icon edit-product" data-drawer="open-right-lg"><i class="zmdi zmdi-edit"></i></a></td>
        </tr>`;
    });
  })
  .catch(error => {
    console.error('Error al obtener información de vehículos:', error);
  });