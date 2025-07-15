import { Component, computed, ElementRef, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  private elementRef = inject(ElementRef);
  private sidebarService = inject(SidebarService);
  private usuarioService = inject(LocalStorageService)
  private router = inject(Router);


  public menuItems = computed(() => this.sidebarService.menu())


  toggleSidebar() {
    const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');
    sidebar.classList.toggle('expand');
  }

  cerrarSesion() {

    Swal.fire({
      title: `¿Desea cerrar sesión?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.logoutAdmin()
        this.router.navigateByUrl("/")
      }
    });

  }
}
