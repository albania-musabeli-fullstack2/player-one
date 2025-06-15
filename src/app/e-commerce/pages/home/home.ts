import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos';
import { CardProduct } from '../../components/card-product/card-product';

@Component({
  selector: 'app-home',
  imports: [
    CardProduct,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home implements OnInit {

  public productos = signal<Producto[]>([]);

  private productosService = inject(ProductosService);


  ngOnInit(): void {
      this.productos.set(this.productosService.listaProductos().filter(prod => prod.consola === 'Super Famicom' ))
  }

}
