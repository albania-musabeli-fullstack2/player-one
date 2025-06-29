import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AlertService } from '../../services/alert/alert-service';



/**
 * @description
 * Componente que gestiona el formulario de contacto del e-commerce.
 * Permite a los usuarios enviar un mensaje con su nombre, correo, teléfono y comentarios,
 * con validaciones de formato y alertas personalizadas.
 */
@Component({
  selector: 'app-contacto',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export default class Contacto {

  // Inyección de dependencias
  public fb = inject(FormBuilder);
  private alertService = inject(AlertService);


  /**
   * @description
   * Formulario reactivo para capturar los datos de contacto del usuario.
   * Incluye los campos nombre, correo, teléfono y comentarios con validaciones específicas.
   * - nombre: Requerido, debe tener al menos 2 caracteres.
   * - correo: Debe seguir el formato de un email válido.
   * - telefono: Debe ser un número de 9 dígitos.
   * - comentarios: Opcional, sin validaciones estrictas.
   * @type {FormGroup}
   */
  public formContacto = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
    comentarios: ['']
  })


  /**
   * @description
   * Procesa el envío del formulario de contacto.
   * Valida los campos nombre, correo, teléfono y comentarios, mostrando alertas si hay errores.
   * Si todos los campos son válidos, muestra una alerta de éxito y reinicia el formulario.
   * @returns {void}
   */
  enviarContacto() {
    const {nombre,correo,telefono,comentarios} = this.formContacto.value;

    if (!nombre || nombre.length < 2) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese su nombre', 'warning');
      return;
    }

    if (!correo || this.formContacto.controls.correo.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese un correo válido', 'warning');
      return;
    }

    if (!telefono || this.formContacto.controls.telefono.invalid) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese su teléfono', 'warning');
      return;
    }

    if (!comentarios || comentarios.length <= 5) {
      this.alertService.handlerAlerta('Advertencia', 'Ingrese comentarios', 'warning');
    }

    Swal.fire({
      text: 'Su correo ha sido enviado.',
      icon:'success'
    })

    // Limpiar formulario
    this.formContacto.reset();
  }

}
