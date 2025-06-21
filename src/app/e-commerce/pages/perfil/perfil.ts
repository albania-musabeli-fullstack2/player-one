import { Component, inject, signal } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [
    RouterModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export default class Perfil {

  private localStoSrv = inject(LocalStorageService);
  public router = inject(Router);

  
  public usuario = signal<Usuario | null>(this.localStoSrv.getUsuarioLogin());
  

  cerrarSesion(){
    this.localStoSrv.logout();
    
    this.router.navigate(['']);
  }

}
