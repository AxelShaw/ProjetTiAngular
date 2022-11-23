import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhubComponent } from './adminhub.component';

describe('AdminhubComponent', () => {
  let component: AdminhubComponent;
  let fixture: ComponentFixture<AdminhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminhubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
