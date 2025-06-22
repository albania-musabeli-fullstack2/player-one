import { Routes } from '@angular/router';
import { ECommerceLayout } from './e-commerce/layout/e-commerce-layout/e-commerce-layout';
import { AdminLayout } from './admin/layout/admin-layout/admin-layout';

export const routes: Routes = [
    {
        path:'',
        component: ECommerceLayout,
        children:[
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
            }
        ]
    },
    {
        path:'admin',
        component: AdminLayout,
        children: [
            {
                path: 'productos',
                loadComponent: () => import('./admin/pages/productos/productos')
            },
            {
                path: '**',
                redirectTo: 'productos'
            }
        ]
    },
    {
        path:'**',
        redirectTo: ''
    }
];
