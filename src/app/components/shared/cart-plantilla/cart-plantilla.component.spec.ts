import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPlantillaComponent } from './cart-plantilla.component';

describe('CartPlantillaComponent', () => {
  let component: CartPlantillaComponent;
  let fixture: ComponentFixture<CartPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
