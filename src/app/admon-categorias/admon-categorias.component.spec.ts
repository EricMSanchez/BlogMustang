import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonCategoriasComponent } from './admon-categorias.component';

describe('AdmonCategoriasComponent', () => {
  let component: AdmonCategoriasComponent;
  let fixture: ComponentFixture<AdmonCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmonCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
