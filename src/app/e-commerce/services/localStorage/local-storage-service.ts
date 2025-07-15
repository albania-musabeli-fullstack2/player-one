import { computed, Injectable, signal } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

/**
 * @description
 * Servicio para gestionar operaciones de almacenamiento local en la aplicación de e-commerce.
 * Maneja la persistencia de usuarios, usuarios administradores, autenticación y gestión de sesiones en localStorage.
 * Proporciona señales computadas para acceder al usuario autenticado y al usuario administrador actual.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'usuarios';
  private storageKeyLogin = 'usuario_login';
  private storageKeyAdminLogin = 'usuario_admin-login';

  private usuario = signal<Usuario | null>(null);
  private adminUsuario = signal<Usuario | null>(null);
  public usuarioLogin = computed(() => this.usuario());
  public adminUsuarioLogin = computed(() => this.adminUsuario());

  /**
   * @description
   * Constructor del servicio.
   * Inicializa la lista de usuarios en localStorage si no existe y carga los usuarios logueados (regular y admin) en las señales.
   */
  constructor() {
    this.initUsuarios();

    const usuarioGuardado = this.getUsuarioLogin();
    if (usuarioGuardado) {
      this.usuario.set(usuarioGuardado);
    }

    const adminUsuarioGuardado = this.getAdminUsuarioLogin();
    if (adminUsuarioGuardado) {
      this.adminUsuario.set(adminUsuarioGuardado);
    }
  }

  /**
   * @description
   * Inicializa localStorage con una lista predeterminada de usuarios si no existe.
   * Crea dos usuarios de ejemplo (uno regular y uno administrador) con datos completos si la clave 'usuarios' no está presente.
   * @returns {void}
   */
  private initUsuarios() {
    const usuarios = localStorage.getItem(this.storageKey);
    if (!usuarios) {
      const usuariosIniciales: Usuario[] = [
        {
          id: Date.now(),
          nombre: 'Albania Musabeli',
          usuario: 'almusabeli',
          correo: 'amusabeli@gmail.com',
          password: 'Actividad123456!',
          fechaNacimiento: '07/09/1989',
          direccion: 'Calle Libertad 2025, Viña del mar',
          telefono: '945678945',
          isAdmin: false
        },
        {
          id: Date.now() + 1,
          nombre: 'Verónica Aguilera',
          usuario: 'veaguilera',
          correo: 'vaguilera@gmail.com',
          password: 'Juegos456789#',
          fechaNacimiento: '09/07/1998',
          direccion: 'Av. Osorno 456, Santiago',
          telefono: '978945612',
          isAdmin: true // Usuario administrador
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(usuariosIniciales));
    }
  }

  /**
   * @description
   * Obtiene la lista de usuarios almacenada en localStorage.
   * @returns {Usuario[]} Arreglo de usuarios, o un arreglo vacío si no hay datos.
   */
  getUsuarios(): Usuario[] {
    const usuarios = localStorage.getItem(this.storageKey);
    return usuarios ? JSON.parse(usuarios) : [];
  }

  /**
   * @description
   * Agrega un nuevo usuario a la lista en localStorage.
   * @param nuevoUsuario - Usuario a agregar.
   * @returns {void}
   */
  agregarUsuario(nuevoUsuario: Usuario) {
    const usuarios = this.getUsuarios();
    usuarios.push(nuevoUsuario);
    localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
  }

  /**
   * @description
   * Valida las credenciales de un usuario para el inicio de sesión (regular o administrador).
   * @param correo - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @param isAdmin - Indica si se debe verificar privilegios de administrador.
   * @returns {Usuario | null} El usuario encontrado si las credenciales son válidas, null en caso contrario.
   */
  validarLogin(correo: string, password: string, isAdmin: boolean = false): Usuario | null {
    const usuarios = this.getUsuarios();
    console.log(usuarios);

    const user = usuarios.find(u => u.correo === correo && u.password === password && (!isAdmin || u.isAdmin));
    return user || null;
  }

  /**
   * @description
   * Busca un usuario por correo y contraseña en localStorage.
   * @param correo - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns {Usuario | undefined} El usuario encontrado si las credenciales son válidas, undefined en caso contrario.
   */
  findUsuarioByEmailAndPassword(correo: string, password: string): Usuario | undefined {
    const usuarios = this.getUsuarios();
    return usuarios.find(u => u.correo === correo && u.password === password);
  }

  /**
   * @description
   * Establece el usuario regular autenticado y lo guarda en localStorage.
   * @param usuario - Usuario a establecer como logueado.
   * @returns {void}
   */
  public setUsuarioLogin(usuario: Usuario) {
    this.usuario.set(usuario);
    localStorage.setItem(this.storageKeyLogin, JSON.stringify(usuario));
  }

  /**
   * @description
   * Obtiene el usuario regular logueado desde localStorage.
   * @returns {Usuario | null} El usuario logueado, o null si no hay sesión activa.
   */
  public getUsuarioLogin(): Usuario | null {
    const usuarioData = localStorage.getItem(this.storageKeyLogin);
    return usuarioData ? JSON.parse(usuarioData) : null;
  }

  /**
   * @description
   * Establece el usuario administrador autenticado y lo guarda en localStorage.
   * @param usuario - Usuario administrador a establecer como logueado.
   * @returns {void}
   */
  public setAdminUsuarioLogin(usuario: Usuario) {
    this.adminUsuario.set(usuario);
    localStorage.setItem(this.storageKeyAdminLogin, JSON.stringify(usuario));
  }

  /**
   * @description
   * Obtiene el usuario administrador logueado desde localStorage.
   * @returns {Usuario | null} El usuario administrador logueado, o null si no hay sesión activa.
   */
  public getAdminUsuarioLogin(): Usuario | null {
    const adminUsuarioData = localStorage.getItem(this.storageKeyAdminLogin);
    return adminUsuarioData ? JSON.parse(adminUsuarioData) : null;
  }

  /**
   * @description
   * Cierra la sesión del usuario regular.
   * Limpia la señal usuario y elimina los datos de la sesión de localStorage.
   * @returns {void}
   */
  public logout() {
    this.usuario.set(null);
    localStorage.removeItem(this.storageKeyLogin);
  }

  /**
   * @description
   * Cierra la sesión del usuario administrador.
   * Limpia la señal adminUsuario y elimina los datos de la sesión de admin de localStorage.
   * @returns {void}
   */
  public logoutAdmin() {
    this.adminUsuario.set(null);
    localStorage.removeItem(this.storageKeyAdminLogin);
  }

  /**
   * @description
   * Actualiza los datos de un usuario en localStorage y en la sesión actual (del perfil).
   * Busca al usuario por su correo y reemplaza sus datos si se encuentra.
   * @param usuarioActualizado - Usuario con los datos actualizados.
   * @returns {void}
   */
  actualizarUsuario(usuarioActualizado: Usuario) {
    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex(u => u.correo === usuarioActualizado.correo);

    if (index !== -1) {
      usuarios[index] = usuarioActualizado;
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      if (this.getUsuarioLogin()?.correo === usuarioActualizado.correo) {
        this.setUsuarioLogin(usuarioActualizado);
      }
      if (this.getAdminUsuarioLogin()?.correo === usuarioActualizado.correo) {
        this.setAdminUsuarioLogin(usuarioActualizado);
      }
    }
  }

  /**
 * @description
 * Elimina un usuario del almacenamiento local por su ID.
 * @param id - ID del usuario a eliminar.
 * @returns {void}
 */
  eliminarUsuarioPorId(id: number): void {
    const usuarios = this.getUsuarios();
    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(nuevosUsuarios));

    // Si el usuario eliminado está logueado, cerramos su sesión
    if (this.getUsuarioLogin()?.id === id) {
      this.logout();
    }

    if (this.getAdminUsuarioLogin()?.id === id) {
      this.logoutAdmin();
    }
  }

}