// Definir la URL de la API
const apiUrl = 'http://localhost:5000/api/project/pf_vehicle/summary';

// Hacer una solicitud GET a la API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud de la API falló');
    }
    return response.json();
  })
  .then(data => {
    // Obtener una referencia al elemento "result"
    const resultDiv = document.getElementById('result');

    // Crear contenido HTML con los datos de la API
    const htmlContent = `
      <div style="margin-left: 15px;">Total de Vehículos: ${data.response[0].total_cars}</div>
      <div>Vehículos disponibles: ${data.response[0].total_cars_available}</div>
      <div>Vehículos reservados: ${data.response[0].total_cars_reserved}</div>
      <div style="margin-right: 15px;">Vehículos en mantenimiento: ${data.response[0].total_cars_maintenance}</div>
    `;

    // Establecer el contenido del elemento "result" con los datos de la API
    resultDiv.innerHTML = htmlContent;
  })
  .catch(error => {
    // Manejar errores
    console.error('Error al obtener datos de la API:', error);
  });