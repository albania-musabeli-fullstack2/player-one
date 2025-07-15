import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../e-commerce/services/localStorage/local-storage-service';
import { CarritoService } from '../../../e-commerce/services/carrito/carrito-service';


/**
 * @description
 * Componente que representa la barra de navegación del e-commerce.
 * Muestra links de navegación y refleja el estado del usuario autenticado y el carrito de compras.
 */
@Component({
  selector: 'e-commerce-navbar',
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  private localStoSrv = inject(LocalStorageService);
  public carritoSrv = inject(CarritoService);
  
  public usuario = computed(()=> this.localStoSrv.usuarioLogin());
  public adminUsuario = computed(() => this.localStoSrv.adminUsuarioLogin());


  ngOnInit() {}

    /**
   * @description
   * Determina la ruta para el botón de admin según si hay un usuario administrador logueado.
   * @returns {string} La ruta a la que navegar ('/admin/productos' si está logueado, '/admin/login' si no).
   */
  getAdminRoute(): string {
    return this.adminUsuario() ? '/admin/usuarios' : '/login-admin';
  }
  
}
