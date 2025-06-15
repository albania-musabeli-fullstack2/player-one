import { Component, input } from '@angular/core';
import { Producto } from '../../services/productos';

@Component({
  selector: 'card-product',
  imports: [],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss'
})
export class CardProduct {

  public producto = input<Producto>();

}
