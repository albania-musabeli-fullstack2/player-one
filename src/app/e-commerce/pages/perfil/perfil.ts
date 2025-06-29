import { Component, inject, signal } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/local-storage-service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditarPerfil } from '../../components/editar-perfil/editar-perfil';



/**
 * @description
 * Componente que muestra el perfil del usuario autenticado en el e-commerce.
 * Permite al usuario cerrar sesión y abrir un diálogo para editar su perfil.
 */
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
  
  /**
   * @description
   * Cierra la sesión del usuario y redirige a la página de inicio.
   * Llama al método logout de LocalStorageService para limpiar la sesión y navega a la ruta raíz.
   * @returns {void}
   */
  cerrarSesion(){
    this.localStoSrv.logout();
    
    this.router.navigate(['']);
  }


  /**
   * @description
   * Abre un modal para editar el perfil del usuario.
   * Pasa los datos del usuario actual al componente EditarPerfil y actualiza el signal usuario si la edición es exitosa.
   * @returns {void}
   */
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
