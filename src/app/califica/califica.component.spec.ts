import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificaComponent } from './califica.component';

describe('CalificaComponent', () => {
  let component: CalificaComponent;
  let fixture: ComponentFixture<CalificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
