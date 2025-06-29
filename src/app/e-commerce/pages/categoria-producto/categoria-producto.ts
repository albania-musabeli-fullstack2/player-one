import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto, ProductosService } from '../../services/productos/productos';
import { CardProduct } from '../../components/card-product/card-product';



/**
 * @description
 * Componente que muestra una lista de productos filtrados por categoría en el e-commerce.
 * Utiliza el componente CardProduct para renderizar los productos y obtiene la categoría desde los parámetros de la ruta.
 */
@Component({
  selector: 'app-categoria-producto',
  imports: [
    CommonModule,
    CardProduct,
  ],
  templateUrl: './categoria-producto.html',
  styleUrl: './categoria-producto.scss'
})
export default class CategoriaProducto implements OnInit, OnDestroy {

  public nombreCategoria = signal<string | null>(null);
  private routeSubscription: Subscription | undefined;
  
  public productosByCategoria = signal<Producto[]>([])

  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private productosService = inject(ProductosService);


  /**
   * @description
   * Inicializa el componente suscribiéndose a los parámetros de la ruta.
   * Actualiza la señal nombreCategoria con el parámetro 'id' de la ruta y filtra los productos
   * por la empresa correspondiente a la categoría.
   */
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.nombreCategoria.set(params.get('id'))
      const productos = this.productosService.listaProductos().filter( prod => prod.empresa === this.nombreCategoria() );
      this.productosByCategoria.set(productos);
      console.log(this.productosByCategoria())
    })
  }


  /**
   * @description
   * Limpia la suscripción a los parámetros de la ruta al destruir el componente.
   */
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription?.unsubscribe();
    }
  }

}
