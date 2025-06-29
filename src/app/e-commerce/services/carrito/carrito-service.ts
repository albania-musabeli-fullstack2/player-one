import { computed, Injectable, signal } from '@angular/core';
import { Producto, ProductoCarrito } from '../../interfaces/producto.interface';



/**
 * @description
 * Servicio para gestionar el carrito de compras en el e-commerce.
 * Maneja el ingreso de productos al carrito, su eliminación y modificación, persiste los datos en Local Storage,
 * y proporciona señales computadas para el total de productos y el precio total.
 */
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


  /**
   * @description
   * Carga los datos del carrito desde localStorage.
   * Valida que los datos sean un array de productos válidos con las propiedades 'id' y 'cantidad'.
   * Retorna un array vacío si no hay datos válidos o si ocurre un error.
   * @returns {ProductoCarrito[]} Array de productos en el carrito.
   */
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


  /**
   * @description
   * Guarda el estado actual del carrito en localStorage.
   * Maneja posibles errores durante el guardado.
   * @returns {void}
   */
  private guardarEnLocalStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrito()));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }


  /**
   * @description
   * Agrega un producto al carrito.
   * Si el producto ya existe, incrementa su cantidad (si no excede el stock).
   * Si no existe, lo añade con cantidad inicial de 1 (si hay stock disponible).
   * Actualiza el carrito y persiste los cambios en localStorage.
   * @param producto - Producto a agregar al carrito.
   * @returns {void}
   */
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


  /**
   * @description
   * Incrementa la cantidad de un producto en el carrito.
   * Sólo incrementa si la cantidad actual es menor al stock disponible.
   * Actualiza el carrito y persiste los cambios en localStorage.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
  aumentarCantidadProducto(id: number) {
    const carritoActual = this.carrito();
    const producto = carritoActual.find(prod => prod.id === id);
    if (producto && producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.carrito.set([...carritoActual]);
      this.guardarEnLocalStorage();
    }
  }


  /**
   * @description
   * Disminuye la cantidad de un producto en el carrito.
   * Disminuye la cantidad si es mayor a 1. Si la cantidad es 1, no realiza cambios.
   * Actualiza el carrito y persiste los cambios en localStorage.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
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


  /**
   * @description
   * Vacía completamente el carrito.
   * Establece el signal carrito como un arreglo vacío y persiste el cambio en localStorage.
   * @returns {void}
   */
  vaciarCarrito() {
    this.carrito.set([]);
    this.guardarEnLocalStorage()
  }


  /**
   * @description
   * Elimina un producto específico del carrito.
   * Filtra el producto por su ID y actualiza el signal carrito, persistiendo los cambios en localStorage.
   * @param id - Identificador único del producto.
   * @returns {void}
   */
  eliminarProducto(id: number) {
    this.carrito.set(this.carrito().filter(prod => prod.id !== id));
    this.guardarEnLocalStorage();
  }

}
