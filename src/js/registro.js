
const btnRegistro = document.getElementById("btn_registro");
const btnLimpiarForm = document.getElementById("btn_limpiar_form");

// Expresión regular para el formato del correo
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresion regular para formato dela contraseña
const passRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;


btnRegistro.addEventListener("click", () => {
    // Valor de los campos del formulario
    const nombre = document.getElementById("registro_input_nombre").value.trim();
    const usuario = document.getElementById("registro_input_usuario").value.trim();
    const correo = document.getElementById("registro_input_correo").value.trim();
    const pass1 = document.getElementById("registro_input_pass1").value;
    const pass2 = document.getElementById("registro_input_pass2").value;
    const nacimiento = document.getElementById("registro_input_nacimiento").value;
    const direccion = document.getElementById("registro_input_direccion").value.trim();


    // Validación de campos
    if (!nombre || !usuario || !correo || !pass1 || !pass2 || !nacimiento) {
        return Swal.fire("Error", "Todos los campos son obligatorios, excepto la dirección", "warning");
    }

    if (!emailRegex.test(correo)) {
        return Swal.fire("Error", "El correo ingresado no es válido", "error");
    }

    if (pass1 !== pass2) {
        return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    if (!passRegex.test(pass1)) {
        return Swal.fire(
            "Error",
            "La contraseña debe tener entre 6 y 18 caracteres, incluir al menos un número y una letra mayúscula",
            "error"
        );
    }


    // Validación: edad mínima 13 años
    const fechaNacimiento = new Date(nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 13) {
        return Swal.fire("Error", "Debes tener al menos 13 años para registrarte", "error");
    }


    // Todo validado correctamente
    Swal.fire("¡Registro exitoso!", "Tu cuenta ha sido creada correctamente", "success").then(() => {
        limpiarFormulario();
    });
})


btnLimpiarForm.addEventListener("click", () => {
    limpiarFormulario();
})



function limpiarFormulario() {
    document.getElementById("registro_input_nombre").value = "";
    document.getElementById("registro_input_usuario").value = "";
    document.getElementById("registro_input_correo").value = "";
    document.getElementById("registro_input_pass1").value = "";
    document.getElementById("registro_input_pass2").value = "";
    document.getElementById("registro_input_nacimiento").value = "";
    document.getElementById("registro_input_direccion").value = "";
}