import { Component, inject, signal } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditarPerfil } from '../../components/editar-perfil/editar-perfil';

@Component({
  selector: 'app-perfil',
  imports: [
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export default class Perfil {

  private localStoSrv = inject(LocalStorageService);
  public router = inject(Router);
  private dialog = inject(MatDialog);

  
  public usuario = signal<Usuario | null>(this.localStoSrv.getUsuarioLogin());
  

  cerrarSesion(){
    this.localStoSrv.logout();
    
    this.router.navigate(['']);
  }


  openEditarPerfil(){
    this.dialog.open(EditarPerfil, {
      width: '50%',
      maxHeight: '100vh',
      data: {
        usuario: this.usuario()
      }
    }).afterClosed().subscribe(res => {
      if (res.status === 'OK') {
        this.usuario.set(this.localStoSrv.getUsuarioLogin())
      }
    })
  }

}
