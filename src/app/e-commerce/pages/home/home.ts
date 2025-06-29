import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos/productos';
import { CardProduct } from '../../components/card-product/card-product';


/**
 * @description
 * Componente principal de la página de inicio del e-commerce
 */
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

  /**
   * @description
   * Inicializa el componente cargando los productos filtrados por la consola "Super Famicom"
   */
  ngOnInit(): void {
      this.productos.set(this.productosService.listaProductos().filter(prod => prod.consola === 'Super Famicom' ))
  }

}
