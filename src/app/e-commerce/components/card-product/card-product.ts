import { Component, input } from '@angular/core';
import { Producto } from '../../services/productos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-product',
  imports: [
    RouterLink,
  ],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss'
})
export class CardProduct {

  public producto = input<Producto>();

}
