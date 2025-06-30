import { TestBed } from '@angular/core/testing';
import { ProductosService, Producto } from './productos';

describe('ProductosService', () => {
  let service: ProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductosService]
    });
    service = TestBed.inject(ProductosService);
  });

  
  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });


  it('debería devolver una lista de productos con la longitud correcta', () => {
    // Act
    const productos = service.listaProductos();

    // Assert
    expect(productos.length).toBe(12); // Verifica que la lista tenga 12 productos
  });


  it('debería devolver productos con la estructura correcta', () => {
    // Act
    const productos = service.listaProductos();
    const primerProducto = productos[0];

    // Assert
    expect(primerProducto).toEqual(jasmine.objectContaining({
      id: jasmine.any(Number),
      nombre: jasmine.any(String),
      consola: jasmine.any(String),
      empresa: jasmine.any(String),
      categoriaProducto: jasmine.any(String),
      categoriaJuego: jasmine.any(String),
      urlImagen: jasmine.any(String),
      precio: jasmine.any(Number),
      stock: jasmine.any(Number)
    }));

    // Verifica que el primer producto tenga los valores esperados
    expect(primerProducto).toEqual(jasmine.objectContaining({
      id: 1,
      nombre: 'Super Mario All Stars',
      consola: 'Super Famicom',
      empresa: 'Nintendo',
      categoriaProducto: 'juego',
      categoriaJuego: 'plataformas',
      precio: 25000,
      stock: 5
    }));
  });
});