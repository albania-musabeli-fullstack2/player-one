import { computed, Injectable, signal } from '@angular/core';
import { Producto, ProductoCarrito } from '../../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private readonly STORAGE_KEY = 'carrito';

  private carrito = signal<ProductoCarrito[]>(this.cargarDeLocalStorage());
  public productosCarrito = computed(() => this.carrito());

  public totalCantidadProductos = computed(
    () => this.carrito().reduce((total, item) => total + item.cantidad, 0)
  );

  // signal para calcular el precio total
  public totalPrecio = computed(
    () => this.carrito().reduce((total, item) => total + (item.cantidad * item.precio), 0)
  );


  private cargarDeLocalStorage(): ProductoCarrito[] {
    try {
      const carritoGuardado = localStorage.getItem(this.STORAGE_KEY);
      if (carritoGuardado) {
        const carritoLocalStorage = JSON.parse(carritoGuardado);
        if (Array.isArray(carritoLocalStorage) && carritoLocalStorage.every(item => 'id' in item && 'cantidad' in item)) {
          return carritoLocalStorage;
        }
      }
      return [];
    } catch (error) {
      console.error('Error al cargar el carrito de localStorage:', error);
      return [];
    }
  }


  private guardarEnLocalStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrito()));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }



   agregarProducto(producto: Producto) {
    const carritoActual = this.carrito();
    const productoExistente = carritoActual.find(p => p.id === producto.id);

    if (productoExistente) {
      if (productoExistente.cantidad < producto.stock) {
        productoExistente.cantidad++;
        this.carrito.set([...carritoActual]);
      }
    } else {
      if (producto.stock > 0) {
        this.carrito.set([...carritoActual, { ...producto, cantidad: 1 }]);
      }
    }
    this.guardarEnLocalStorage();
  }


  aumentarCantidadProducto(id: number){
    const carritoActual = this.carrito();
    const producto = carritoActual.find(prod => prod.id === id);
    if (producto && producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.carrito.set([...carritoActual]);
      this.guardarEnLocalStorage();
    }
  }


  disminuirCantidadProducto(id: number) {
    const carritoActual = this.carrito();
    const producto = carritoActual.find(p => p.id === id);
    if (producto && producto.cantidad > 1) {
      producto.cantidad--;
      this.carrito.set([...carritoActual]);
      this.guardarEnLocalStorage();
    }
    else if (producto && producto.cantidad === 1) {
      this.carrito.set([...carritoActual]);
      this.guardarEnLocalStorage();
    }
  }



  vaciarCarrito(){
    this.carrito.set([]);
    this.guardarEnLocalStorage()
  }


  eliminarProducto(id: number){
    this.carrito.set(this.carrito().filter(prod => prod.id !== id));
    this.guardarEnLocalStorage();
  }

}
