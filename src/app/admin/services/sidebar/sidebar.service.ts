import { Injectable, signal } from '@angular/core';

export interface DashboarItem {
    label: string;
    icon: string;
    link?: string;
    submenu?: Submenu[]
}

export interface Submenu {
    label: string,
    link: string,
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu = signal<DashboarItem[]>([
    {
      label: 'Mantenedor',
      icon: 'lni lni-list',
      submenu: [
        {
          label: 'Usuarios',
          link: 'usuarios'
        },

        {
          label: 'Productos',
          link: 'productos'
        },
      ]
    },
   
    // {
    //   label: 'Opciones',
    //   icon: 'lni lni-cog',
    //   link: ''
    // }, 
  ])
}
