import { Component, computed, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito-service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';
import { AlertService } from '../../services/alert/alert-service';
import Swal from 'sweetalert2';

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
export default class CarritoCompras implements OnInit {

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

  ngOnInit(){
    console.log(this.carritoSrv.productosCarrito())
  }


  aumentarCantidad(id: number){
    this.carritoSrv.aumentarCantidadProducto(id);
  }

  disminuirCantidad(id: number){
    this.carritoSrv.disminuirCantidadProducto(id);
  }

  eliminarProducto(id: number){
    this.carritoSrv.eliminarProducto(id);
  }


  pagar(){
    if (this.carritoSrv.productosCarrito().length === 0) {
      return;
    }

    this.handlerAlertaConfirm();

    
    //this.carritoSrv.vaciarCarrito();

    //this.router.navigate(['/']);
  }


  handlerAlertaConfirm() {
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
