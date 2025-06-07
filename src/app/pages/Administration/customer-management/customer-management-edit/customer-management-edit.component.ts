import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../core/services/utility.service';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'e-seva-customer-management-edit',
  templateUrl: './customer-management-edit.component.html',
  styleUrl: './customer-management-edit.component.css'
})
export class CustomerManagementEditComponent {
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
  public customerDataID: any = '';
  constructor(public route: ActivatedRoute, public router: Router, public api: ApiService, public utility: UtilityService,) {
    this.route.paramMap.subscribe((params: any) => {
      this.customerDataID = params.get('customerDataID')!;
    });
  }

  ngOnInit(): void {
    this.getCustomerDetails();
  }
  getCustomerDetails() {
    let obj = {
      customerDataID: +this.customerDataID
    }
    this.api.customerDetailsList(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.paymentDetailsForm = res['data'][0]
      }
    }).catch((error: any) => {
      console.log(error)
    });
    if (this.paymentDetailsForm?.['date'] == '') {
      const today = new Date();
      this.paymentDetailsForm['date'] = today.toISOString().split('T')[0];
    }
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
    this.api.customerDetailsEdit(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.navigation('administration/customer-management')
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
}
