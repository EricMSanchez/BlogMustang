import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonUsuariosComponent } from './admon-usuarios.component';

describe('AdmonUsuariosComponent', () => {
  let component: AdmonUsuariosComponent;
  let fixture: ComponentFixture<AdmonUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmonUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
