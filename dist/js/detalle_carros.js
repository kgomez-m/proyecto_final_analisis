var api_url = "http://localhost:4000/api/project/pf_dashboard/";
fetch(api_url + 'vehicle-summary')
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud de la API falló');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      $("#count-total-cars").html(data.response[0].total_cars)
      $("#count-rents").html(data.response[0].total_cars_reserved)
      $("#count-available").html(data.response[0].total_cars_available)
      $("#count-maintenance").html(data.response[0].total_cars_maintenance)
    }
  })
  .catch(error => {
    console.error('Error al obtener información de vehículos:', error);
  });