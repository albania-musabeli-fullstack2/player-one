import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage-service';
import { Usuario } from '../../interfaces/usuario.interface';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  // Mock de localStorage
  let localStorageMock: { [key: string]: string } = {};
  const mockUsuario: Usuario = {
    nombre: 'Test User',
    usuario: 'testuser',
    correo: 'test@test.com',
    password: 'Test123456!',
    fechaNacimiento: '01/01/1990',
    direccion: 'Calle Test 123, Santiago',
    telefono: '965412587'
  };

  beforeEach(() => {
    // Configurar mock de localStorage
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => localStorageMock[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete localStorageMock[key];
    });

    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    service = TestBed.inject(LocalStorageService);
  });


  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  
  it('debería devolver null si las credenciales son incorrectas', () => {
    // Act
    const usuario = service.validarLogin('noexiste@correo.com', 'wrongpassword');

    // Assert
    expect(usuario).toBeNull();
  });

});