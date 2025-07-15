import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mayorDeEdadValidator } from '../../../shared/utils/nacimiento-validation';
import { EditarPerfil } from '../../../e-commerce/components/editar-perfil/editar-perfil';
import { AlertService } from '../../../e-commerce/services/alert/alert-service';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';
import { passwordIgualesValidation } from '../../../shared/utils/password-validation';

@Component({
  selector: 'app-agregar-usuario',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './agregar-usuario.html',
  styleUrl: './agregar-usuario.scss'
})
export class AgregarUsuario {


  public fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private localStoSrv = inject(LocalStorageService);
  private dialogRef = inject(MatDialogRef<EditarPerfil>)
  public data = inject(MAT_DIALOG_DATA);




  /**
     * @description
     * Formulario reactivo para capturar los datos de registro del usuario.
     * Incluye los siguientes campos con sus validaciones:
     * - nombre: Requerido, entre 2 y 50 caracteres.
     * - usuario: Requerido, mínimo 3 caracteres.
     * - correo: Requerido, debe seguir el formato de un email válido.
     * - pass1: Requerido, debe tener entre 8 y 20 caracteres, con al menos una letra minúscula, una mayúscula, un número y un carácter especial.
     * - pass2: Requerido, debe coincidir con pass1 (validado por passwordIgualesValidation).
     * - nacimiento: Requerido, el usuario debe ser mayor de 18 años (validado por mayorDeEdadValidator).
     * - direccion: Requerido, mínimo 5 caracteres.
     * - telefono: Requerido, debe ser un número de 9 dígitos.
     */
  public formRegistro = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    pass1: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]],
    pass2: ['', [Validators.required]],
    nacimiento: ['', [Validators.required, mayorDeEdadValidator]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]] // permite solo 9 números
  },
    {
      validators: [passwordIgualesValidation()]
    }
  )


  /**
   * @description
   * Procesa el envío del formulario de registro.
   * Valida todos los campos del formulario, muestra alertas si hay errores, y guarda el usuario en el local Storage
   * si todas las validaciones son exitosas. Redirige a la página de login tras un registro exitoso.
   * @returns {void}
   */
  nuevoUsuario() {
    console.log('Nuevo usuario', this.formRegistro.value)
    const { nombre, usuario, correo, pass1, pass2, nacimiento, direccion, telefono } = this.formRegistro.value;

    if (!nombre || this.formRegistro.controls.nombre.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un nombre válido (mínimo 2 letras)', 'warning');
      return;
    }

    if (!usuario || this.formRegistro.controls.usuario.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un nombre de usuario válido (mínimo 3 caracteres)', 'warning');
      return;
    }

    if (!correo || this.formRegistro.controls.correo.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un correo electrónico válido', 'warning');
      return;
    }

    if (!pass1 || this.formRegistro.controls.pass1.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'La contraseña debe tener mayúsculas, minúsculas, número, símbolo y 8-20 caracteres', 'warning');
      return;
    }

    if (!pass2 || this.formRegistro.controls.pass2.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Debe repetir la contraseña', 'warning');
      return;
    }

    // Validar que las contrasenas sean iguales
    if (pass1 !== pass2) {
      this.alertService.handlerAlerta('Advertencia', 'Las contraseñas no coinciden', 'warning');
      return;
    }

    if (!nacimiento || this.formRegistro.controls.nacimiento.invalid) {
      if (this.formRegistro.controls.nacimiento.errors?.['menorDeEdad']) {
        this.alertService.handlerAlerta('Advertencia', 'Debes tener al menos 18 años para registrarte', 'warning');
      } else {
        this.alertService.handlerAlerta('Advertencia', 'Ingrese una fecha de nacimiento válida', 'warning');
      }
      return;
    }

    if (!direccion || this.formRegistro.controls.direccion.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese su dirección', 'warning');
      return;
    }

    if (!telefono || this.formRegistro.controls.telefono.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un teléfono válido', 'warning');
      return;
    }


    // Guardar usuario nuevo en el local Storage
    this.localStoSrv.agregarUsuario({
      id: Date.now() ,nombre, usuario, correo, password: pass1, fechaNacimiento: nacimiento, direccion, telefono, isAdmin: false
    })

    this.alertService.handlerAlerta('Éxito', 'Usuario registrado correctamente', 'success');
    console.log('Nuevo usuario:', this.formRegistro.value);

    // cerrar modal y actualizar tabla
    this.dialogRef.close({
      status: 'OK'
    });


  }

}
