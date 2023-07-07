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
            if (!row.isTeacher) {
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



    function searchByLastName() {
        const surname = document.querySelector('#surnameInput').value;
        fetch(`http://localhost:8080/api/associate/getBySurname/${surname}`)
        .then(response => response.json())
        .then(responseData => {
            // Verifica si la respuesta contiene un array
            if (Array.isArray(responseData.data)) {
              // Obtiene la tabla y limpia su contenido anterior
              const tabla = document.querySelector('#miDiv');
              const tbody = tabla.querySelector('tbody');
              tbody.innerHTML = '';
              // Itera sobre los datos y agrega filas a la tabla
              responseData.data.forEach((asociado, index) => {
                if (!row.isTeacher) {
                const nuevaFila = document.createElement('tr');
                nuevaFila.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${asociado.name}</td>
                  <td>${asociado.surname}</td>
                  <td>${asociado.gender}</td>
                  <td>${asociado.email}</td>
                  <td>${asociado.address}</td>
                  <td>${asociado.age}</td>
                  <td>${asociado.phone}</td>
                  <td>${asociado.disciplines}</td>
                `;
                tbody.appendChild(nuevaFila);
                }
              });
            } else {
              // Si no hay datos, muestra un mensaje de error
              console.log('No se encontraron datos');
            }
        })
        .catch(error => console.error('Error:', error));
    }

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
              if (!row.isTeacher) {
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