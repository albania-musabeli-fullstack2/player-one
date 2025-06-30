import { ComponentFixture, TestBed } from '@angular/core/testing';

import CategoriaProducto from './categoria-producto';

describe('CategoriaProducto', () => {
  let component: CategoriaProducto;
  let fixture: ComponentFixture<CategoriaProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
