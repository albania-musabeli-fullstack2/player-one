import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


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