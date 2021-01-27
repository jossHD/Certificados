import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCertiComponent } from './card-certi.component';

describe('CardCertiComponent', () => {
  let component: CardCertiComponent;
  let fixture: ComponentFixture<CardCertiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCertiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCertiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
