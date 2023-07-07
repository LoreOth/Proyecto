

document.addEventListener('DOMContentLoaded', () => {
    // Realiza una petición al servidor para obtener los datos
    fetch('http://localhost:8080/api/discipline/listar')
      .then(response => response.json())
      .then(responseData => {
        // Verifica si la respuesta contiene un array
        if (Array.isArray(responseData.data)) {
          console.log(responseData)
          const data = responseData.data;
          // Manipula el DOM y muestra los datos en la tabla
          const table = document.querySelector('#miDiv');
          const tbody = table.querySelector('tbody');
          tbody.innerHTML = '';
          // Itera sobre los datos y agrega filas a la tabla
          data.forEach((row, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${index + 1}</td>
              <td>${row.name}</td>
              <td>${row.description}</td>
              <td>${row.days}</td>
              <td>${row.hour}</td>
              <td>${row.teacher}</td>
            `;
            tbody.appendChild(newRow);
          });
        } else {
          console.error('La respuesta de la API no contiene un array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
/*
  jQuery(window).on('DOMContentLoaded', function() {
    jQuery('#miDiv').DataTable({
      "pageLength": 7,
      "searching": true
    });
});
*/