import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDetailsListComponent } from './cash-details-list.component';

describe('CashDetailsListComponent', () => {
  let component: CashDetailsListComponent;
  let fixture: ComponentFixture<CashDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashDetailsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
