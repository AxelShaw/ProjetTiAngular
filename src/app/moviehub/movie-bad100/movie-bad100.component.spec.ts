import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBad100Component } from './movie-bad100.component';

describe('MovieBad100Component', () => {
  let component: MovieBad100Component;
  let fixture: ComponentFixture<MovieBad100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieBad100Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBad100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
