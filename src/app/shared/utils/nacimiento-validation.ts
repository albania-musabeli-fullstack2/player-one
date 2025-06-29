import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * @description
 * Validador personalizado para formularios reactivos que verifica si el usuario es mayor de 18 años.
 * @param control - Control del formulario que contiene la fecha de nacimiento (en formato de cadena o Date).
 * @returns {ValidationErrors | null} Retorna null si el usuario es mayor de 18 años o si el valor es nulo;
 * de lo contrario, retorna un objeto con el error `{ menorDeEdad: true }`.
 */
export function mayorDeEdadValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;

    const fechaNacimiento = new Date(valor);
    const hoy = new Date();

    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    const esMayor = edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));

    return esMayor ? null : { menorDeEdad: true };
}
