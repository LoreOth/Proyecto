document.addEventListener('DOMContentLoaded', () => {
    // Realiza una petición al servidor para obtener los datos
    fetch('http://localhost:8080/api/associate/listar')
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
            if (row.isTeacher) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${row.name}</td>
              <td>${row.surname}</td>
              <td>${row.gender}</td>
              <td>${row.email}</td>
              <td>${row.address}</td>
              <td>${row.age}</td>
              <td>${row.phone}</td>
              <td>${row.disciplines}</td>
            `;
            tbody.appendChild(newRow);
            }
          });
        } else {
          console.error('La respuesta de la API no contiene un array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });


  function showAll() {
    fetch('http://localhost:8080/api/associate/listar')
      .then(response => response.json())
      .then(responseData => {
        if (Array.isArray(responseData.data)) {
          console.log(responseData)
          const data = responseData.data;
          const table = document.querySelector('#miDiv');
          const tbody = table.querySelector('tbody');
          tbody.innerHTML = '';
          data.forEach((row, index) => {
            if (row.isTeacher) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
              <td>${row.name}</td>
              <td>${row.surname}</td>
              <td>${row.gender}</td>
              <td>${row.email}</td>
              <td>${row.address}</td>
              <td>${row.age}</td>
              <td>${row.phone}</td>
              <td>${row.disciplines}</td>
            `;
            tbody.appendChild(newRow);
            }
          });
        } else {
          console.error('La respuesta de la API no contiene un array:', responseData);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function clearTable() {
    document.getElementById("miDivBody").innerHTML = "";
  }