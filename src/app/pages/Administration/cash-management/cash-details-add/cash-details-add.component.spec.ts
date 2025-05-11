import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDetailsAddComponent } from './cash-details-add.component';

describe('CashDetailsAddComponent', () => {
  let component: CashDetailsAddComponent;
  let fixture: ComponentFixture<CashDetailsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashDetailsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
