import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../services/alert/alert-service';
import { passwordIgualesValidation } from '../../../shared/utils/password-validation';
import { mayorDeEdadValidator } from '../../../shared/utils/nacimiento-validation';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';

@Component({
  selector: 'app-registro',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export default class Registro {

  // Inyección de dependencias
  public fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private localStoSrv = inject(LocalStorageService);
  private router = inject(Router);


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
      nombre, usuario, correo, password: pass1, fechaNacimiento: nacimiento, direccion, telefono
    })

    this.alertService.handlerAlerta('Éxito', 'Usuario registrado correctamente', 'success');
    console.log('Nuevo usuario:', this.formRegistro.value);
    
    // redirigir al login
    this.router.navigate(['/login']);
  }

  limpiarFormulario() {
    this.formRegistro.reset();
  }

}
