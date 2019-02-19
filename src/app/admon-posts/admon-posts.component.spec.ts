import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonPostsComponent } from './admon-posts.component';

describe('AdmonPostsComponent', () => {
  let component: AdmonPostsComponent;
  let fixture: ComponentFixture<AdmonPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmonPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
