import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';



/**
 * @description
 * Servicio para gestionar la visualización de alertas personalizadas en el e-commerce.
 * Utiliza SweetAlert2 para mostrar notificaciones con título, mensaje e ícono.
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  handlerAlerta(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }
}
