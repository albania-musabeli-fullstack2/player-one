import { computed, Injectable, signal } from '@angular/core';


export interface Producto {
  id: number;
  nombre: string;
  consola: string;
  empresa: string;
  categoriaProducto: string;
  categoriaJuego: string;
  urlImagen: string;
  precio: number;
}



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos = signal<Producto[]>([
    {
      "id": 1,
      "nombre": "Super Mario All Stars",
      "consola": "Super Famicom",
      "empresa": "Nintendo",
      "categoriaProducto":"juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fsupermarioallstars.jpg?alt=media&token=bffdebf1-c8ea-4f55-ac43-ddc2996ef512",
      "precio": 25000
    },
    {
      "id": 2,
      "nombre": "Donkey Kong Country",
      "consola": "Super Famicom",
      "empresa": "Nintendo",
      "categoriaProducto": "juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fdonkeykong1.jpg?alt=media&token=6c4c7817-9a47-4979-a595-b64f6cc0cf3b",
      "precio": 25000
    },
    {
      "id": 3,
      "nombre": "Donkey Kong Country 2",
      "consola": "Super Famicom",
      "empresa": "Nintendo",
      "categoriaProducto": "juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fdonkeykong2.jpg?alt=media&token=535ab1fc-73b6-4cb9-afde-350b625c1920",
      "precio": 25000
    },
    {
      "id": 4,
      "nombre": "G Darius",
      "consola": "PlayStation",
      "empresa": "PlayStation",
      "categoriaProducto": "juego",
      "categoriaJuego": "acción",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fg-darius-playstation.jpg?alt=media&token=cb960c5f-5bd4-4945-8d97-759fa761e0d8",
      "precio": 25000
    },
    {
      "id": 5,
      "nombre": "Final Fantasy VII",
      "consola": "PlayStation",
      "empresa": "PlayStation",
      "categoriaProducto": "juego",
      "categoriaJuego": "RPG",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Ffinal-fantasy-vii-playstation.jpg?alt=media&token=e0e81a44-1feb-4c8a-8517-5c37a08b4b8d",
      "precio": 40000
    },
    {
      "id": 6,
      "nombre": "Metal Gear Solid",
      "consola": "PlayStation",
      "empresa": "PlayStation",
      "categoriaProducto": "juego",
      "categoriaJuego": "acción",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fmetal-gear-solid-playstation.jpg?alt=media&token=ecc962ff-bdbf-4f11-bc2c-f15e752e2baa",
      "precio": 40000
    },
    {
      "id": 7,
      "nombre": "Sonic the Hedgehog 2",
      "consola": "Megadrive",
      "empresa": "Sega",
      "categoriaProducto": "juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fsonic-the-hedgehog-2.jpg?alt=media&token=7fec3aab-c7c8-4e3c-9474-ef594656fd5c",
      "precio": 30000
    },
    {
      "id": 8,
      "nombre": "Sonic the Hedgehog 3",
      "consola": "Megadrive",
      "empresa": "Sega",
      "categoriaProducto": "juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fsonic-the-hedgehog-3.jpg?alt=media&token=c872ce02-81f3-4164-94c3-1c199b9db3e7",
      "precio": 25000
    },
    {
      "id": 9,
      "nombre": "Bare Knuckle",
      "consola": "Megadrive",
      "empresa": "Sega",
      "categoriaProducto": "juego",
      "categoriaJuego": "plataformas",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fstreets-of-rage-sega.jpg?alt=media&token=c0f8bdd3-114e-42b9-ad43-0029a8022182",
      "precio": 25000
    },
    {
      "id": 10,
      "nombre": "Joystick Nintendo 64",
      "consola": "Nintendo 64",
      "empresa": "Nintendo",
      "categoriaProducto": "accesorio",
      "categoriaJuego": "accesorio",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fjoystick-N64-clear-blue.jpg?alt=media&token=9d988b35-91ab-4421-93cc-49453f3f23d6",
      "precio": 70000
    },
     {
      "id": 11,
      "nombre": "Joystick Nintendo 64",
      "consola": "Nintendo 64",
      "empresa": "Nintendo",
      "categoriaProducto": "accesorio",
      "categoriaJuego": "accesorio",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fjoystick-n64-pikachu_redim.jpg?alt=media&token=686a5eef-f632-4b90-8f34-cc45463b0f1b",
      "precio": 50000
    },
     {
      "id": 12,
      "nombre": "Joystick PlayStation",
      "consola": "PlayStation",
      "empresa": "PlayStation",
      "categoriaProducto": "accesorio",
      "categoriaJuego": "accesorio",
      "urlImagen": "https://firebasestorage.googleapis.com/v0/b/ty-web-90658.appspot.com/o/player-one%2Fjoystick_playstation_.jpg?alt=media&token=6a6a8734-64a8-4017-9c1b-c9896bffc33d",
      "precio": 22000
    },
  ])


  public listaProductos = computed(() => this.productos())




}
