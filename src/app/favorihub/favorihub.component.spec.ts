import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorihubComponent } from './favorihub.component';

describe('FavorihubComponent', () => {
  let component: FavorihubComponent;
  let fixture: ComponentFixture<FavorihubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorihubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavorihubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
