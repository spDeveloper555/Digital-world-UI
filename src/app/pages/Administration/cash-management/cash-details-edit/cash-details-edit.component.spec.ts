import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDetailsEditComponent } from './cash-details-edit.component';

describe('CashDetailsEditComponent', () => {
  let component: CashDetailsEditComponent;
  let fixture: ComponentFixture<CashDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashDetailsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
