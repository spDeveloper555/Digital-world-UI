import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'e-seva-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.css'
})
export class CustomerManagementComponent {
  public customerServies: any = [];
  public isLoading: boolean = true;
  public apiPagination: any = {
    page: 1,
    limit: 20
  }
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getcustomerDetailsList();
  }
  getcustomerDetailsList(page: any = 1, limit: any = 20, search: any = '') {
    let obj: any = {
      page: page,
      limit: limit
    };
    if (search != '') obj['search'] = search;
    this.api.customerDetailsList(obj)?.then((res: any) => {
      if (res['status'] == 'success') {
        for(let data of res['data']) {
          data['location'] = this.utility.get_location_data(data)
        }
        this.customerServies = res['data'];
      }
      this.isLoading = false;
    }).catch((error: any) => {
      console.log(error)
    });
  }
  navigation(path: string) {
    this.router.navigate([path]);
  }
  public deletecustomerID: any = '';
  trashCustomerDetail(customerDataID: any) {
    this.showConfirm = true;
    this.deletecustomerID = customerDataID;
  }
  editCustomerDetail(customerDataID: any) {
    let path = 'administration/customer-management/edit/' + customerDataID;
    this.router.navigate([path]);
  }
  viewCustomerDetail(customerDataID: any) {
    let path = 'administration/customer-management/history/' + customerDataID;
    this.router.navigate([path]);
  }
  showConfirm = false;

  handleConfirm(result: boolean) {
    this.showConfirm = false;
    if (result) {
      this.api.customerDetailsDelete({ customerDataID: +this.deletecustomerID })?.then((res: any) => {
        if (res['status'] == 'success') {
          this.isLoading = true;
          this.getcustomerDetailsList();
        }
      }).catch((error: any) => {
        console.log(error)
      });
    }
    this.deletecustomerID = '';
  }

  public searchChangeObserver: any;
  onSearchChange(searchValue: string) {
    searchValue = searchValue.trim()
    if (!this.searchChangeObserver) {
      new Observable(observer => {
        this.searchChangeObserver = observer;
      }).pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe((term: any) => {
          if (String(term).length == 0 || String(term).length >= 2) this.getcustomerDetailsList(this.apiPagination.page, this.apiPagination.limit, term);
        });
    }
    this.searchChangeObserver.next(searchValue);
  }
}
