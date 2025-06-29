import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos/productos';
import { Producto as ProductoI } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito/carrito-service';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';



/**
 * @description
 * Componente que muestra los detalles de un producto específico en el e-commerce.
 * Obtiene el producto basado en el ID proporcionado en la ruta y permite añadirlo al carrito
 */
@Component({
  selector: 'app-producto',
  imports: [
    RouterModule,
    SeparadorMilesPipe,
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.scss'
})
export default class Producto implements OnInit {

  public productoId = signal<string | null>(null);
  private routeSubscription: Subscription | undefined;
  public producto = signal<ProductoI | null>(null);

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductosService);
  private carritoSrv = inject(CarritoService);

  /**
   * @description
   * Inicializa el componente suscribiéndose a los parámetros de la ruta.
   * Actualiza la señal productoId con el parámetro 'id' de la ruta y busca el producto correspondiente
   * en la lista de productos del servicio ProductosService.
   */
  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.productoId.set(params.get('id'));
      console.log(this.productoId())
      console.log(this.productoService.listaProductos())
      const producto = this.productoService.listaProductos().find(prod => prod.id === +this.productoId()!)

      console.log(producto);

      if (producto) {
        this.producto.set(producto);
      }

    })
  }


  /**
   * @description
   * Añade el producto actual al carrito de compras.
   * Llama al método agregarProducto del servicio CarritoService con el producto almacenado en la señal producto.
   * @returns {void}
   */
  agregarAlCarrito() {
    this.carritoSrv.agregarProducto(this.producto()!)
  }

}
