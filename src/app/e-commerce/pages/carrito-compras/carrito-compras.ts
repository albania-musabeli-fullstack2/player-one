import { Component, computed, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito-service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';
import { AlertService } from '../../services/alert/alert-service';
import Swal from 'sweetalert2';



/**
 * @description
 * Componente que gestiona el carrito de compras del e-commerce.
 * Muestra los productos añadidos al carrito, permite modificar cantidades, eliminar productos y simula el pago.
 * Redirige a la página de inicio tras una simulación de compra exitosa.
 */
@Component({
  selector: 'app-carrito-compras',
  imports: [
    CommonModule,
    RouterLink,
    SeparadorMilesPipe,
  ],
  templateUrl: './carrito-compras.html',
  styleUrl: './carrito-compras.scss'
})
export default class CarritoCompras {

  // Inyección dependencias
  public carritoSrv = inject(CarritoService);
  public alertSrv = inject(AlertService);
  public router = inject(Router);

  public precioEnvio = computed(() => {
    if (this.carritoSrv.productosCarrito().length === 0) {
      return 0;
    }
    else {
      return 5000;
    }
  })


  /**
   * @description
   * Incrementa la cantidad de un producto en el carrito.
   * Llama al método aumentarCantidadProducto del servicio CarritoService.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
  aumentarCantidadProducto(id: number){
    this.carritoSrv.aumentarCantidadProducto(id);
  }


  /**
   * @description
   * Reduce la cantidad de un producto en el carrito.
   * Llama al método disminuirCantidadProducto del servicio CarritoService.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
  disminuirCantidadProducto(id: number){
    this.carritoSrv.disminuirCantidadProducto(id);
  }


  /**
   * @description
   * Elimina un producto del carrito.
   * Llama al método eliminarProducto del servicio CarritoService.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
  eliminarProducto(id: number){
    this.carritoSrv.eliminarProducto(id);
  }


  /**
   * @description
   * Inicia el proceso de pago, si el carrito no está vacío, muestra una alerta de confirmación.
   * @returns {void}
   */
  pagar(){
    if (this.carritoSrv.productosCarrito().length === 0) {
      return;
    }

    this.handlerAlertaConfirm();
  }


  /**
   * @description
   * Muestra una alerta de confirmación para finalizar la compra.
   * Si se confirma, vacía el carrito y redirige a la página de inicio.
   * @returns {void}
   */
  public handlerAlertaConfirm() {
    Swal.fire({
      title: "Compra exitosa",
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
      //denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoSrv.vaciarCarrito();

        this.router.navigate(['/']);
      }
      else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  

}
