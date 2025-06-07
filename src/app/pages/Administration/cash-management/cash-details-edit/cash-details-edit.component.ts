import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../core/services/utility.service';
import { ApiService } from '../../../../core/services/api.service';
@Component({
  selector: 'e-seva-cash-details-edit',
  templateUrl: './cash-details-edit.component.html',
  styleUrl: './cash-details-edit.component.css'
})
export class CashDetailsEditComponent implements OnInit {
  public paymentDetailsForm: any = {
    service: '',
    paymentType: '',
    date: '',
    amount: '',
    customerID: '',
    processOperator: ''
  }
  public errorObj: any = {
    service: '',
    paymentType: '',
    date: '',
    amount: '',
    customerID: '',
    processOperator: '',
  }
  public services: any = [
    'Other service',
    'New pan card',
    'Correction pan card',
    'E-pan card download with color print',
    'Pan card reprint',
    'Pan card Aadhaar link',
    'Aadhaar name, address, DOB, gender correction',
    'Aadhaar reprint',
    'E-Aadhaar download with color print',
    'New ration card',
    'Address change in ration card',
    'Name remove in ration card',
    'Add name in ration card',
    'Change family head in ration card',
    'New passport',
    'Renewal passport',
    'Correction passport',
    'Child passport',
    'Bus ticket booking (booking + charges)',
    'Train ticket booking (booking + charges)',
    'Two-wheeler insurance',
    'Corp insurance',
    'Chitta / A-register / FMB',
    'Adangal paper',
    'EC (Villanga chantru) certificate generate rate 50 + additional paper 5/sheet',
    'EB bill',
    'All exam application fees',
    'New voter ID',
    'Correction voter ID',
    'Employment new',
    'Renewal',
    'Birth / death certificate register',
    'Block and color birth / death print',
    'Community certificate',
    'Income certificate',
    'Native certificate',
    'First graduate',
    'Small farmer',
    'No male child',
    'OBC certificate',
    'Inter caste marriage',
    'Deceased woman certificate',
    'Legal heir certificate',
    'Widow certificate',
    'Unmarried certificate',
    'Unemployment certificate',
    'Solvency certificate',
    'Patta transfer',
    'Marriage assistant certificate',
    'Two female child fund certificate',
    'Money transfer',
    'Cash withdrawal',
    'MSME registration',
    'PM Kisan registration',
    'PM Kisan correction',
    'Computer jathagam (basic 30 + additional paper 5)',
    'EPFO claiming',
    'EPFO any correction',
    'Pensioner life certificate',
    'RTE act',
    'Lamination ID card',
    'Lamination A4 paper',
    'Lamination legal paper',
    'Xerox per page',
    'Print per page (first paper 5)',
    'Email access',
    'Scan copy / 1 page',
    'Flight ticket',
    'Xerox back to back',
    'TNEB new application',
    'TNUWWB card pension registration',
    'Loan repayment'
  ];

  public paymentType: any = [
    'Credit',
    'Debit',
    'Borrower'
  ];
  public processOperator: any = ["Bala", "Sudha", "Tamil", "Guru"];
  public cashDataID: any = '';
  constructor(public router: Router, public route: ActivatedRoute, public api: ApiService, public utility: UtilityService) {
    this.route.paramMap.subscribe((params: any) => {
      this.cashDataID = params.get('cashDataID')!;
    });
  }

  ngOnInit(): void {
    this.getPaymentDetails();
  }
  getPaymentDetails() {
    let obj = {
      cashDataID: +this.cashDataID
    }
    this.api.cashDetailsList(obj)?.then((res: any) => {
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

  onSubmit() {
    const obj = this.paymentDetailsForm;
    let userDetails: any = localStorage.getItem('userDetails');
    if (userDetails) userDetails = JSON.parse(userDetails);
    obj['processOperator'] = userDetails['firstName'] + " " + userDetails['lastName'];
    let formValidation = this.utility.formValidation(obj, ['service', 'paymentType', 'date']);
    if (!formValidation.isValid) {
      this.errorObj = formValidation['message'];
      return;
    }
    this.api.cashDetailsEdit(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.navigation('administration/cash-management')
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
}
