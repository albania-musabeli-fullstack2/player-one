import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';
import { AlertService } from '../../services/alert/alert-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export default class Login {

  // Inyección de dependencias
  public fb = inject(FormBuilder);
  public router = inject(Router);
  public localStoSrv = inject(LocalStorageService);
  public alertSrv = inject(AlertService);


  public formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)]]
  })


  ingresar() {
    if (this.formLogin.invalid) {
      this.alertSrv.handlerAlerta('Advertencia', 'El correo y/o la contraseña no son válidos', 'warning')
      return;
    }
    else {
      // Validar que existe el usuario
      const user = this.localStoSrv.findUsuarioByEmailAndPassword(
        this.formLogin.controls.correo.value!,
        this.formLogin.controls.password.value!)

      if (user) {
        this.localStoSrv.setUsuarioLogin(user); // guardar el usuario logueado
        console.log('usuairo login',this.localStoSrv.usuarioLogin());

        this.router.navigate(['']);  // redirigir al home
      }
      else {
        this.alertSrv.handlerAlerta('Advertencia', 'El correo y/o la contraseña no son válidos. Inténtelo nuevamente', 'warning')
      }
    }
  }

}
