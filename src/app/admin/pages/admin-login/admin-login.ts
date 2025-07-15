import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';
import { AlertService } from '../../../e-commerce/services/alert/alert-service';
import { CommonModule } from '@angular/common';

/**
 * @description
 * Componente que gestiona el formulario de inicio de sesión para administradores del e-commerce.
 * Utiliza formularios reactivos para autenticar usuarios administradores con correo y contraseña,
 * con validaciones de formato y manejo de alertas para errores. Redirige al panel administrativo tras un login exitoso.
 */
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.scss']
})
export default class AdminLogin {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private localStoSrv = inject(LocalStorageService);
  private alertSrv = inject(AlertService);

  public formLogin = this.fb.group({
    correo: ['vaguilera@gmail.com', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['Juegos456789#', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]]
  });

  /**
   * @description
   * Procesa el envío del formulario de inicio de sesión de administrador.
   * Valida las credenciales, busca al usuario administrador en localStorage, y redirige al panel administrativo si es válido.
   * Muestra alertas de error si las credenciales son inválidas o el usuario no es administrador.
   * @returns {void}
   */
  ingresar() {
    if (this.formLogin.invalid) {
      this.alertSrv.handlerAlerta('Advertencia', 'El correo y/o la contraseña no son válidos', 'warning');
      return;
    }

    const user = this.localStoSrv.validarLogin(
      this.formLogin.controls.correo.value!,
      this.formLogin.controls.password.value!,
      true // Solo administradores
    ); 

    console.log(user);
    

    if (user) {
      this.localStoSrv.setAdminUsuarioLogin(user); 
      console.log('Usuario admin login', this.localStoSrv.adminUsuarioLogin());
      this.router.navigate(['/admin/productos']);
    } else {
      this.alertSrv.handlerAlerta('Advertencia', 'El correo y/o la contraseña no son válidos o el usuario no es administrador. Inténtelo nuevamente', 'warning');
    }
  }
}