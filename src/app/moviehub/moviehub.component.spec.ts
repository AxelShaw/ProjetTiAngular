import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviehubComponent } from './moviehub.component';

describe('MoviehubComponent', () => {
  let component: MoviehubComponent;
  let fixture: ComponentFixture<MoviehubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviehubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviehubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
