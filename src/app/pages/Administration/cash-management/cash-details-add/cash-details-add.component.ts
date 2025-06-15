import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../core/services/utility.service';
import { ApiService } from '../../../../core/services/api.service';
import { current_services } from './modal';
@Component({
  selector: 'e-seva-cash-details-add',
  templateUrl: './cash-details-add.component.html',
  styleUrl: './cash-details-add.component.css'
})
export class CashDetailsAddComponent implements OnInit {
  public paymentDetailsForm: any = {
    service: '',
    subService: '',
    ReferenceID: '',
    paymentType: '',
    date: '',
    paymentMode: '',
    amount: '',
    processOperator: '',
    customerName: '',
    customerMobileNo: ''
  }
  public errorObj: any = {
    service: '',
    subService: '',
    ReferenceID: '',
    paymentType: '',
    date: '',
    paymentMode: '',
    amount: '',
    processOperator: '',
    customerName: '',
    customerMobileNo: ''
  }
  public services_obj: any = current_services;
  public services: any = Object.keys(this.services_obj);
  public shopInfo = {
    name: 'Shakthi E-Seva',
    address: 'Melur, Kallakurichi - 606201',
    mobileNo: '63793 05484',
    email: 'sakthieseva.csc@gmail.com'
  };

  public customerInfo = {
    name: '',
    address: '',
    email: '',
    mobileNo: '',
    city: '',
    state: '',
    pincode: ''
  };

  public invoiceDate = new Date();
  public invoiceID = '';

  public paymentType: any = [
    'Credit',
    'Debit',
    'Borrower'
  ];
  public processOperator: any = ["Bala", "Sudha", "Tamil", "Guru"];
  public invoiceServies: any = [];
  constructor(public router: Router, public api: ApiService, public utility: UtilityService,) { }

  ngOnInit(): void {
    this.onPatchData();
  }
  onPatchData() {
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
    if (field == 'paymentType' && this.paymentDetailsForm[field] == 'Credit') {
      this.paymentDetailsForm['amount'] = this.services_obj[this.paymentDetailsForm['service']]
    } else if (field == 'paymentType') this.paymentDetailsForm['amount'] = '';
  }
  dropdownOpen = false;
  filteredServices() {
    const search = this.paymentDetailsForm.service.toLowerCase();
    return this.services.filter((option: any) =>
      option.toLowerCase().includes(search)
    );
  }

  selectService(option: string) {
    this.paymentDetailsForm.service = option;
    this.dropdownOpen = false;
    this.fieldChange('service', 'text', { target: { value: option } });
  }

  closeDropdownWithDelay() {
    setTimeout(() => this.dropdownOpen = false, 200);
  }
  addInvoice() {
    const obj = this.paymentDetailsForm;
    let formValidation = this.utility.formValidation(obj, ['service', 'subService', 'ReferenceID', 'paymentType', 'date', 'amount', 'customerMobileNo']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) userDetails = JSON.parse(userDetails);
    obj['processOperator'] = userDetails['firstName'] + " " + userDetails['lastName'];
    this.invoiceServies.push(obj)
    this.resetForm(this.paymentDetailsForm['customerMobileNo'], this.paymentDetailsForm['customerName']);
  }
  print() {
    const obj = this.paymentDetailsForm;
    let formValidation = this.utility.formValidation(obj, ['service', 'subService', 'ReferenceID', 'paymentType', 'date', 'amount', 'customerMobileNo']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) userDetails = JSON.parse(userDetails);
    obj['processOperator'] = userDetails['firstName'] + " " + userDetails['lastName'];
    this.invoiceServies.push(obj)
    this.invoiceTotal = this.invoiceServies.reduce((total: any, item: any) => {
      return total + Number(item.amount);
    }, 0);
    this.tableLength = 6 - this.invoiceServies.length;
    this.submitInvoice();
    setTimeout(() => {
      const printContent = document.getElementById('print-section');
      const WindowPrt = window.open('', '', 'width=900,height=650');
      if (WindowPrt && printContent) {
        WindowPrt.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"/>
            <style>
              .invoice-container {
                max-width: 800px;
                margin: auto;
                font-family: Arial, sans-serif;
                color: #333;
                padding: 10px;
                background: #fff;
                border: 1px solid #ddd;
              }

              h1 {
                color: #154d5c;
              }

              .info-section {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
              }

              .invoice-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 5px;
              }

              .invoice-table th,
              .invoice-table td {
                border: 1px solid #ccc;
                padding: 5px;
                text-align: left;
              }

              .invoice-table thead {
                background-color: #154d5c;
                color: #fff;
              }

              .total-section {
                text-align: right;
                font-size: 18px;
                margin-top: 10px;
              }
              .bg-image {
                  position: relative;
                  z-index: 1;
                }

                .bg-image::before {
                  content: "";
                  position: absolute;
                  top: 80;
                  left: 0;
                  height: 100%;
                  width: 100%;
                  background-image: url('./../../../../../assets/image/logo/sakthi-rm-logo.png');
                  background-repeat: no-repeat;
                  opacity: 0.15;
                  z-index: -1;
                  pointer-events: none;
                }
              .footer {
                margin: 40px 10px 20px 10px;
                font-size: 12px;
                color: #666;
                text-align: center;
              }
            </style>
          </head>
          <body onload="window.print();window.close()">
            ${printContent.innerHTML}
          </body>
        </html>
      `);
        WindowPrt.document.close();
      }
    }, 100);
  }
  public invoiceTotal: number = 0;
  public tableLength: any = 6;
  printAll() {
    if (this.invoiceServies.length > 0) {
      this.invoiceTotal = this.invoiceServies.reduce((total: any, item: any) => {
        return total + Number(item.amount);
      }, 0);
      this.tableLength = 6 - this.invoiceServies.length;
      this.submitInvoice();
      setTimeout(() => {
        const printContent = document.getElementById('print-section');
        const WindowPrt = window.open('', '', 'width=900,height=650');
        if (WindowPrt && printContent) {
          WindowPrt.document.write(`
        <html>
          <head>
            <title>Print</title>
            <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"/>
            <style>
              .invoice-container {
                max-width: 800px;
                margin: auto;
                font-family: Arial, sans-serif;
                color: #333;
                padding: 10px;
                background: #fff;
                border: 1px solid #ddd;
              }

              h1 {
                color: #154d5c;
              }

              .info-section {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
              }

              .invoice-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 5px;
              }

              .invoice-table th,
              .invoice-table td {
                border: 1px solid #ccc;
                padding: 5px;
                text-align: left;
              }

              .invoice-table thead {
                background-color: #154d5c;
                color: #fff;
              }

              .total-section {
                text-align: right;
                font-size: 18px;
                margin-top: 10px;
              }

              .footer {
                margin: 40px 10px 20px 10px;
                font-size: 12px;
                color: #666;
                text-align: center;
              }
                .bg-image {
                  position: relative;
                  z-index: 1;
                }

                .bg-image::before {
                  content: "";
                  position: absolute;
                  top: 80;
                  left: 0;
                  height: 100%;
                  width: 100%;
                  background-image: url('./../../../../../assets/image/logo/sakthi-rm-logo.png');
                  background-repeat: no-repeat;

                  opacity: 0.15;
                  z-index: -1;
                  pointer-events: none;
                }
            </style>
          </head>
          <body onload="window.print();window.close()">
            ${printContent.innerHTML}
          </body>
        </html>
      `);
          WindowPrt.document.close();
        }
      }, 100);
    }
  }
  async submitInvoice() {
    let res: any = await this.api.cashDetailsAdd({ 'invoice_details': this.invoiceServies })?.catch((error: any) => { console.log(error) });
    if (res['status'] == 'success') {
      this.invoiceID = res['invoiceID'];
      if(res['customerInfo']?.['name']) this.customerInfo['name'] = res['customerInfo']['name'];
      if(res['customerInfo']?.['mobileNo']) this.customerInfo['mobileNo'] = res['customerInfo']['mobileNo'];
    }
    return res;
  }
  resetForm(mobileNo = '', name = '') {
    this.paymentDetailsForm = {
      service: '',
      subService: '',
      ReferenceID: '',
      paymentType: '',
      paymentMode: '',
      amount: '',
      date: this.paymentDetailsForm['date'],
      processOperator: '',
      customerName: name,
      customerMobileNo: mobileNo
    };
    this.errorObj = {
      service: '',
      subService: '',
      ReferenceID: '',
      paymentType: '',
      date: '',
      paymentMode: '',
      amount: '',
      processOperator: ''
    }
  }
  trashCashDetail(index: number) {
    this.invoiceServies.splice(index, 1);
  }
  editCashDetail(index: number) {
    this.paymentDetailsForm = this.invoiceServies[index];
    this.invoiceServies.splice(index, 1);
  }
  public invoiceOperator: any = "";
  onSubmit() {
    const obj = this.paymentDetailsForm;
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) userDetails = JSON.parse(userDetails);
    obj['processOperator'] = userDetails['firstName'] + " " + userDetails['lastName'];
    this.invoiceOperator = obj['processOperator'];
    let formValidation = this.utility.formValidation(obj, ['service', 'subService', 'ReferenceID', 'paymentType', 'date']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.api.cashDetailsAdd({ 'invoice_details': [obj] })?.then((res: any) => {
      if (res['status'] == 'success') {
        this.navigation('administration/cash-management')
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
}
