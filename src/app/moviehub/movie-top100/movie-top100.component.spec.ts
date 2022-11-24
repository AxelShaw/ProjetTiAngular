import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTop100Component } from './movie-top100.component';

describe('MovieTop100Component', () => {
  let component: MovieTop100Component;
  let fixture: ComponentFixture<MovieTop100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTop100Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTop100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
