import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';
import { Usuario } from '../../../e-commerce/interfaces/usuario.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarPerfil } from '../../../e-commerce/components/editar-perfil/editar-perfil';


import Swal from 'sweetalert2';
import { FormatoFechaPipe } from '../../../shared/pipes/formatoFecha.pipe';
import { AgregarUsuario } from '../../components/agregar-usuario/agregar-usuario';


@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,

    FormatoFechaPipe,
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export default class Usuarios implements OnInit {

  usuarios: Usuario[] = [];

  dataSource = new MatTableDataSource(this.usuarios);
  displayedColumns: string[] = ['accion', 'nombre', 'usuario', 'correo', 'fechaNacimiento', 'direccion', 'telefono'];

  usuariosService = inject(LocalStorageService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    const usuarios = this.usuariosService.getUsuarios()
    console.log(usuarios);

    this.dataSource = new MatTableDataSource(usuarios);
  }

  crearUsuario(){
     this.dialog.open(AgregarUsuario, {
      width: '50%',
      maxHeight: '100vh',
    }).afterClosed().subscribe(res => {
      if (res.status === 'OK') {
        this.obtenerUsuarios();
      }
    })
  }

  editarUsuario(usuario: any) {
    this.dialog.open(EditarPerfil, {
      width: '50%',
      maxHeight: '100vh',
      data: {
        usuario: usuario,
        titulo: 'Editar Usuario'
      }
    }).afterClosed().subscribe(res => {
      if (res.status === 'OK') {
        this.obtenerUsuarios();

      }
    })
  }

  eliminarUsuario(usuario: any) {
    Swal.fire({
      title: `¿Desea eliminar al usuario ${usuario.nombre}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Eliminar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuarioPorId(usuario.id);
        this.obtenerUsuarios();
      } 
    });
  }

}
