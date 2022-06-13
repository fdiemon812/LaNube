import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAlumnoComponent } from './filtro-alumno.component';

describe('FiltroAlumnoComponent', () => {
  let component: FiltroAlumnoComponent;
  let fixture: ComponentFixture<FiltroAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
