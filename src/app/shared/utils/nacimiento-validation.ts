import { AbstractControl, ValidationErrors } from '@angular/forms';

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
