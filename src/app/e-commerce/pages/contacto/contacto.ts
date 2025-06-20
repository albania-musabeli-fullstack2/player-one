import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AlertService } from '../../services/alert/alert-service';


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


  public formContacto = this.fb.group({
    nombre: [''],
    correo: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
    comentarios: ['']
  })


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
