import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

/**
 * @description
 * Validador personalizado para formulario reactivo que verifica si dos campos de contraseña son iguales.
 * Se usa en un FormGroup que contiene los campos 'pass1' y 'pass2'.
 * @returns {ValidatorFn} Función validadora que compara los valores de los campos 'pass1' y 'pass2'.
 */
export function passwordIgualesValidation(): ValidatorFn  {
    return (group: AbstractControl): ValidationErrors | null => {
        const pass1 = group.get('pass1')?.value;
        const pass2 = group.get('pass2')?.value;

        // No validar si estan vacias
        if (!pass1 || !pass2) {
            return null;
        }
        return pass1 === pass2 ? null : {constrasenasNoCoinciden: true};
    }
}