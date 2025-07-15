import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../../e-commerce/services/localStorage/local-storage-service';

/**
 * @description
 * Guardia para proteger las rutas del panel administrativo, asegurando que solo usuarios administradores autenticados puedan acceder.
 * Verifica si hay un usuario administrador logueado en localStorage. Redirige al login de admin si no está autenticado.
 */
export const adminAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const adminUser = localStorageService.getAdminUsuarioLogin();
  if (adminUser) {
    return true; // Permite acceso a las rutas del admin
  } else {
    router.navigate(['/login-admin']);
    return false; // Redirige al login de admin
  }
};