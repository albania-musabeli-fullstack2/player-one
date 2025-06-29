import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { mayorDeEdadValidator } from '../../../shared/utils/nacimiento-validation';
import { AlertService } from '../../services/alert/alert-service';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';



/**
 * @description
 * Componente que gestiona el formulario de edición de perfil en un modal.
 * Permite a los usuarios actualizar sus datos personales, con validaciones estrictas, y guarda los cambios en el localStorage.
 */
@Component({
  selector: 'app-editar-perfil',
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.scss'
})
export class EditarPerfil implements OnInit {

  public fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private localStoSrv = inject(LocalStorageService);
  private dialogRef = inject(MatDialogRef<EditarPerfil>)
  public data = inject(MAT_DIALOG_DATA);


  /**
   * @description
   * Inicializa el componente cargando los datos del usuario en el formulario.
   * Aplica los valores del usuario inyectado a través de MAT_DIALOG_DATA al formulario.
   */
  ngOnInit() {
    console.log(this.data)
    this.formPerfil.patchValue({
      nombre: this.data.usuario.nombre,
      usuario: this.data.usuario.usuario,
      correo: this.data.usuario.correo,
      nacimiento: (this.data.usuario.fechaNacimiento),
      direccion: this.data.usuario.direccion,
      telefono: this.data.usuario.telefono
    })

  }


  /**
   * @description
   * Formulario reactivo para editar los datos del perfil del usuario.
   * Incluye los campos: nombre, usuario, correo, nacimiento, direccion y telefono con sus validaciones
   */
  public formPerfil = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    nacimiento: ['', [Validators.required, mayorDeEdadValidator]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
  })


  /**
   * @description
   * Procesa la actualización del perfil del usuario.
   * Valida los campos del formulario, muestra alertas si hay errores, y actualiza el usuario en el localStorage
   * si todas las validaciones son exitosas. Cierra el diálogo con un estado de éxito.
   * @returns {void}
   */
  actualizar() {
    const { nombre, usuario, correo, nacimiento, direccion, telefono } = this.formPerfil.value;

    if (!nombre || this.formPerfil.controls.nombre.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un nombre válido (mínimo 2 letras)', 'warning');
      return;
    }

    if (!usuario || this.formPerfil.controls.usuario.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un nombre de usuario válido (mínimo 3 caracteres)', 'warning');
      return;
    }

    if (!correo || this.formPerfil.controls.correo.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un correo electrónico válido', 'warning');
      return;
    }

    if (!nacimiento || this.formPerfil.controls.nacimiento.invalid) {
      if (this.formPerfil.controls.nacimiento.errors?.['menorDeEdad']) {
        this.alertService.handlerAlerta('Advertencia', 'Debes tener al menos 18 años para registrarte', 'warning');
      } else {
        this.alertService.handlerAlerta('Advertencia', 'Ingrese una fecha de nacimiento válida', 'warning');
      }
      return;
    }

    if (!direccion || this.formPerfil.controls.direccion.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese su dirección', 'warning');
      return;
    }

    if (!telefono || this.formPerfil.controls.telefono.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un teléfono válido', 'warning');
      return;
    }


    const usuarioActualizado = {
      nombre,
      usuario,
      correo,
      password: this.data.usuario.password,
      fechaNacimiento: nacimiento,
      direccion,
      telefono
    };

    this.localStoSrv.actualizarUsuario(usuarioActualizado);
    this.alertService.handlerAlerta('Éxito', 'Perfil actualizado correctamente', 'success');

    // cerrar
    this.dialogRef.close({
      status: 'OK'
    });
  }


}
