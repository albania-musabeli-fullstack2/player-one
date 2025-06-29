import { Component, input } from '@angular/core';
import { Producto } from '../../services/productos/productos';
import { RouterLink } from '@angular/router';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';

@Component({
  selector: 'card-product',
  imports: [
    RouterLink,
    SeparadorMilesPipe,
  ],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss'
})
export class CardProduct {

  public producto = input<Producto>();

}
