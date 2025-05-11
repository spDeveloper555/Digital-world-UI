import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'e-seva-cash-details-add',
  templateUrl: './cash-details-add.component.html',
  styleUrl: './cash-details-add.component.css'
})
export class CashDetailsAddComponent {
  public paymentDetailsForm: any = {

  }
  public errorObj:any = {

  }
  constructor(public router: Router) { }
  navigation(path: string) {
    this.router.navigate([path]);
  }
    fieldChange(field: any, type: any, e: any) {
    let value = e['target']['value']
    if (type == 'text') {
      value = value.trim();
      this.paymentDetailsForm[field] = value;
      this.errorObj[field] = "";
    }
  }
  onSubmit() {

  }
}
