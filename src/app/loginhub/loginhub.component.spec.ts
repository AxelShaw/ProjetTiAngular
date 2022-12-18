import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginhubComponent } from './loginhub.component';

describe('LoginhubComponent', () => {
  let component: LoginhubComponent;
  let fixture: ComponentFixture<LoginhubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginhubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
