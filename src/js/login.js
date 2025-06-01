
const usuarioTest = {
    correo: "usuariotest@playerone.cl",
    password: "12345678"
};


// Expresión Regular para formato de correo
const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const inputCorreo = document.getElementById("login_mail");
const btnIngresar = document.getElementById("btn_ingresar");
const inputPassword = document.getElementById("login_pass");


btnIngresar.addEventListener("click", () => {
    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    // Validación de correo
    if (!correoRegex.test(correo)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'Por favor, ingrese un correo válido'
        });
        return;
    }

    // Validación de contraseña
    if (password.length < 8) {
        Swal.fire({
            icon: 'warning',
            title: 'Contraseña muy corta',
            text: 'La contraseña debe tener al menos 8 caracteres'
        });
        return;
    }

    // Validación del usuario test
    if (correo === usuarioTest.correo && password === usuarioTest.password) {
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
            confirmButtonText: 'Continuar'
        }).then(() => {
            window.location.href = "../index.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Correo o contraseña no válidos'
        });
    }
});
