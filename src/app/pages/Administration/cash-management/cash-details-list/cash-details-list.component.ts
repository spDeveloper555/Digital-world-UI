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
      this.cashDataID = params.get('cashDataID')!;
    });
  }
  public invoice: any = {};
  public cashDataID: any = "";
  ngOnInit(): void {
    this.getPaymentDetails();
  }
  getPaymentDetails() {
    let obj = {
      cashDataID: +this.cashDataID
    }
    this.api.cashDetailsList(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        this.invoice = res['data'][0]
      }
    }).catch((error: any) => {
      console.log(error)
    });
  }
  navigation(path: string) {
    this.router.navigate([path]);
  }
}
