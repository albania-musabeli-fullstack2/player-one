import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductosService } from '../../services/productos/productos';
import { Producto as ProductoI } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito/carrito-service';
import { SeparadorMilesPipe } from '../../../shared/pipes/separador-miles-pipe';

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


  agregarAlCarrito() {
    this.carritoSrv.agregarProducto(this.producto()!)
  }

  


}
