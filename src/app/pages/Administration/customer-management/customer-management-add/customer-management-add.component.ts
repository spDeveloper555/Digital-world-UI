import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../core/services/utility.service';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'e-seva-customer-management-add',
  templateUrl: './customer-management-add.component.html',
  styleUrl: './customer-management-add.component.css'
})
export class CustomerManagementAddComponent implements OnInit {
  public paymentDetailsForm: any = {
    name: '',
    fatherName: '',
    email: '',
    mobileNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    smsType: ''
  }
  public errorObj: any = {
    name: '',
    fatherName: '',
    email: '',
    mobileNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    smsType: ''
  }

  constructor(public router: Router, public api: ApiService, public utility: UtilityService,) { }

  ngOnInit(): void {
  }
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
    const obj = this.paymentDetailsForm;
    let formValidation = this.utility.formValidation(obj, ['name', 'mobileNo']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.api.customerDetailsAdd(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.navigation('administration/customer-management')
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
}
