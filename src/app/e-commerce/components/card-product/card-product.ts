import { Component, inject, input } from '@angular/core';
import { Producto } from '../../services/productos/productos';
import { RouterLink } from '@angular/router';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../../services/carrito/carrito-service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'card-product',
  imports: [
    RouterLink,
    SeparadorMilesPipe,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss'
})
export class CardProduct {

  public producto = input<Producto>();
  public carritoSrv = inject(CarritoService);


  agregarAlCarrito(){
    this.carritoSrv.agregarProducto(this.producto()!);
  }

}
