export interface Producto {
    id: number;
    nombre: string;
    consola: string;
    empresa: string;
    categoriaProducto: string;
    categoriaJuego: string;
    urlImagen: string;
    precio: number;
    stock?: number;
}