import { Routes } from '@angular/router';
import { ECommerceLayout } from './e-commerce/layout/e-commerce-layout/e-commerce-layout';
import { AdminLayout } from './admin/layout/admin-layout/admin-layout';
import { adminAuthGuard } from './shared/guards/admin-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: ECommerceLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./e-commerce/pages/home/home')
      },
      {
        path: 'contacto',
        loadComponent: () => import('./e-commerce/pages/contacto/contacto')
      },
      {
        path: 'categoria/:id',
        loadComponent: () => import('./e-commerce/pages/categoria-producto/categoria-producto')
      },
      {
        path: 'login',
        loadComponent: () => import('./e-commerce/pages/login/login')
      },
      {
        path: 'registro',
        loadComponent: () => import('./e-commerce/pages/registro/registro')
      },
      {
        path: 'perfil-usuario',
        loadComponent: () => import('./e-commerce/pages/perfil/perfil')
      },
      {
        path: 'producto/:id',
        loadComponent: () => import('./e-commerce/pages/producto/producto')
      },
      {
        path: 'carrito-compras',
        loadComponent: () => import('./e-commerce/pages/carrito-compras/carrito-compras')
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [

      {
        path: 'usuarios',
        loadComponent: () => import('./admin/pages/usuarios/usuarios'),
        canActivate: [adminAuthGuard]
      },
      {
        path: '**',
        redirectTo: 'usuarios'
      }
    ]
  },
  {
    path: 'login-admin',
    loadComponent: () => import('./admin/pages/admin-login/admin-login')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
