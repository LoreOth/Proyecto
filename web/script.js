
const loginForm = document.getElementById('saveTransaction');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
  
    const email = document.getElementById('transactionEmail').value;
    const password = document.getElementById('transactionPassword').value;
  
    // Realizar la solicitud al servidor para iniciar sesión
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      const { token } = data;
  
      // Guardar el token en el almacenamiento local o en una cookie, si es necesario
  
      // Redirigir al usuario a la página deseada
      window.location.href = './portada.html'; // Reemplaza '/dashboard' con la URL de tu página deseada
    } else {
      // Mostrar un mensaje de error al usuario
      const errorData = await response.json();
      console.error(errorData.error);
    }
  });