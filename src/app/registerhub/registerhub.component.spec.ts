import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterhubComponent } from './registerhub.component';

describe('RegisterhubComponent', () => {
  let component: RegisterhubComponent;
  let fixture: ComponentFixture<RegisterhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterhubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
