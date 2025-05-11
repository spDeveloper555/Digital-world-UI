import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashManagementComponent } from './cash-management.component';

describe('CashManagementComponent', () => {
  let component: CashManagementComponent;
  let fixture: ComponentFixture<CashManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
