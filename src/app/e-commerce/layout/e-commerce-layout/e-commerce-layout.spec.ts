import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceLayout } from './e-commerce-layout';

describe('ECommerceLayout', () => {
  let component: ECommerceLayout;
  let fixture: ComponentFixture<ECommerceLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ECommerceLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECommerceLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
