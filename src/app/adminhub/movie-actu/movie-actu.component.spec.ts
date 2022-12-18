import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActuComponent } from './movie-actu.component';

describe('MovieActuComponent', () => {
  let component: MovieActuComponent;
  let fixture: ComponentFixture<MovieActuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieActuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
