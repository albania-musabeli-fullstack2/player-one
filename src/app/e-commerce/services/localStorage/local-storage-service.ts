import { computed, Injectable, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'usuarios';
  private storageKeyLogin = 'usuario_login';

  private usuario = signal<Usuario | null>(null);
  public usuarioLogin = computed(() => this.usuario());


  constructor() {
    this.initUsuarios();

    const usuarioGuardado = this.getUsuarioLogin();
    if (usuarioGuardado) {
      this.usuario.set(usuarioGuardado);
    }
  }


  private initUsuarios() {
    const usuarios = localStorage.getItem(this.storageKey);
    if (!usuarios) {
      const usuariosIniciales: Usuario[] = [
        {
          nombre: 'Albania Musabeli',
          usuario: 'almusabeli',
          correo: 'amusabeli@gmail.com',
          password: 'Actividad123456!',
          fechaNacimiento: '07/09/1989',
          direccion: 'Calle Libertad 2025, Viña del mar'
        },
        {
          nombre: 'Verónica Aguilera',
          usuario: 'veaguilera',
          correo: 'vaguilera@gmail.com',
          password: 'Juegos456789#',
          fechaNacimiento: '09/07/1998',
          direccion: 'Av. Osorno 456, Santiago'
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(usuariosIniciales));
    }
  }


  getUsuarios(): Usuario[] {
    const usuarios = localStorage.getItem(this.storageKey);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  agregarUsuario(nuevoUsuario: Usuario) {
    const usuarios = this.getUsuarios();
    usuarios.push(nuevoUsuario);
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  }

  validarLogin(correo: string, password: string): Usuario | null {
    const usuarios = this.getUsuarios();
    const user = usuarios.find(u => u.correo === correo && u.password === password);
    return user || null;
  }

  findUsuarioByEmailAndPassword(correo: string, password: string): Usuario | undefined {
    const usuarios = this.getUsuarios();
    return usuarios.find(u => u.correo === correo && u.password === password);
  }


  public setUsuarioLogin(usuario: Usuario) {
    this.usuario.set(usuario);
    localStorage.setItem(this.storageKeyLogin, JSON.stringify(usuario));
  }


  // Obtener usuario logueado desde local storage
  public getUsuarioLogin(): Usuario | null {
    const usuarioData = localStorage.getItem(this.storageKeyLogin);
    return usuarioData ? JSON.parse(usuarioData) : null;
  }


  // Cerrar sesión y eliminar del local Storage
  public logout(){
    this.usuario.set(null);
    localStorage.removeItem(this.storageKeyLogin);
  }


}
