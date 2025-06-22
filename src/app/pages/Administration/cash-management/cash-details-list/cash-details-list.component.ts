import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../../../../core/services/utility.service';
import { ApiService } from '../../../../core/services/api.service';
@Component({
  selector: 'e-seva-cash-details-list',
  templateUrl: './cash-details-list.component.html',
  styleUrl: './cash-details-list.component.css'
})
export class CashDetailsListComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public api: ApiService,
    public utility: UtilityService) {
    this.route.paramMap.subscribe((params: any) => {
      this.paymentID = params.get('cashDataID')!;
    });
  }
  public paymentID: any = "";
  ngOnInit(): void {
    this.getPaymentDetails();
  }
  getPaymentDetails() {
    let obj = {
      paymentID: this.paymentID
    }
    this.api.cashDetailsList(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.invoice = res['data'];
        this.customerInfo = res['customerInfo'];
        this.invoiceTotal = this.invoice.reduce((total: any, item: any) => {
          return total + Number(item.amount);
        }, 0);
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
  public shopInfo = {
    name: 'Sakthi E-Seva',
    address: 'Melur, Kallakurichi - 606201',
    mobileNo: '63793 05484',
    email: 'sakthieseva.csc@gmail.com'
  };
  public invoice: any = [];
  public invoiceTotal: number = 0;
  public tableLength: any = 8;
  public customerInfo = {
    name: '',
    address: '',
    email: '',
    mobileNo: '',
    city: '',
    state: '',
    pincode: ''
  };
  navigation(path: string) {
    this.router.navigate([path]);
  }
}
