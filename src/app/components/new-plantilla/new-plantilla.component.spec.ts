import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlantillaComponent } from './new-plantilla.component';

describe('NewPlantillaComponent', () => {
  let component: NewPlantillaComponent;
  let fixture: ComponentFixture<NewPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
