export interface Usuario {
    id?: number
    nombre: string;
    usuario: string;
    correo: string;
    password: string;
    fechaNacimiento: string; // DD/MM/YYYY
    direccion: string;
    telefono: string;
    isAdmin?: boolean;
}