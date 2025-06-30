import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { AlertService } from '../../services/alert/alert-service';
import Contacto from './contacto';

// Mock AlertService
class MockAlertService {
  handlerAlerta(title: string, message: string, icon: string) {}
}

describe('Contacto', () => {
  let component: Contacto;
  let fixture: ComponentFixture<Contacto>;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        Contacto
      ],
      providers: [
        FormBuilder,
        { provide: AlertService, useClass: MockAlertService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Contacto);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Debería mostrar una alerta de advertencia cuando el formulario se envía con un correo inválido', () => {
    spyOn(alertService, 'handlerAlerta');
    component.formContacto.setValue({
      nombre: 'Usuario Test',
      correo: 'correo-invalido',
      telefono: '123456789',
      comentarios: 'Esta es una prueba'
    });

    component.enviarContacto();

    expect(alertService.handlerAlerta).toHaveBeenCalledWith('Advertencia', 'Ingrese un correo válido', 'warning');
  });



  it('debería mostrar una alerta de éxito y restablecer el formulario cuando todos los campos son válidos', () => {
    spyOn(Swal, 'fire');
    spyOn(component.formContacto, 'reset');
    component.formContacto.setValue({
      nombre: 'Usuario Test',
      correo: 'usuariotest@correo.com',
      telefono: '123456789',
      comentarios: 'Este es un comentario'
    });

    component.enviarContacto();

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
      text: 'Su correo ha sido enviado.',
      icon: 'success'
    }));
    expect(component.formContacto.reset).toHaveBeenCalled();
  });
});