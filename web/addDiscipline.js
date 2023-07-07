const addDisciplineBtn = document.getElementById('addDisciplineBtn');

addDisciplineBtn.addEventListener('click', async () => {
  const name = document.getElementById('disciplineName').value;
  const description = document.getElementById('disciplineDescription').value;
  const days = document.getElementById('disciplineDays').value;
  const hour = document.getElementById('disciplineHour').value;
  const teacher = document.getElementById('disciplineTeacher').value;

  // Realizar la solicitud al servidor para agregar la disciplina
  const response = await fetch('http://localhost:8080/api/discipline/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, days, hour, teacher }),
  });

  if (response.ok) {
    const data = await response.json();
    const { token } = data;

    // Guardar el token en el almacenamiento local o en una cookie, si es necesario

    // Redirigir al usuario a la página deseada
    window.location.href = './discipline.html'; // Reemplaza '/dashboard' con la URL de tu página deseada
  } else {
    // Mostrar un mensaje de error al usuario
    const errorData = await response.json();
    console.error(errorData.error);
  }
});