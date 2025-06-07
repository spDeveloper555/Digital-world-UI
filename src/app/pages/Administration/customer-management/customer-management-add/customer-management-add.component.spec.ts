import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementAddComponent } from './customer-management-add.component';

describe('CustomerManagementAddComponent', () => {
  let component: CustomerManagementAddComponent;
  let fixture: ComponentFixture<CustomerManagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerManagementAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
