import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';



/**
 * @description
 * Interfaz que define la estructura de un producto en el e-commerce.
 */
export interface Producto {
  id: number;
  nombre: string;
  consola: string;
  empresa: string;
  categoriaProducto: string;
  categoriaJuego: string;
  urlImagen: string;
  precio: number;
  stock: number;
}


/**
 * @description
 * Servicio para gestionar la lista de productos en el e-commerce.
 * Proporciona una señal computada con una lista estática de productos predefinidos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // URL del archivo JSON en GitHub Pages (reemplaza con tu URL real)
  private readonly apiUrl = 'https://albania-musabeli-fullstack2.github.io/player-one-api/db.json';

  /**
     * @description
     * Señal que almacena la lista de productos obtenida desde el servidor.
     */
  private productos = signal<Producto[]>([]);

  /**
   * @description
   * Señal computada que proporciona la lista de productos disponibles.
   */
  public listaProductos = computed(() => this.productos());

  constructor(private http: HttpClient) {
    // Inicializa la señal con los datos de la llamada HTTP
    this.getAllProductos().subscribe({
      next: (res) => {
        if(res.length > 0) {
          this.productos.set(res)
        }
        else {
          this.productos.set([])
        }
      },
      error: (error) => {
        this.productos.set([])
      }
    });
   
  }
  
  public getAllProductos(){
    return this.http.get<Producto[]>(this.apiUrl)
  }
    

}
