import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'e-seva-cash-management',
  templateUrl: './cash-management.component.html',
  styleUrl: './cash-management.component.css'
})
export class CashManagementComponent {
  public cashServies: any = [];
  public isLoading: boolean = true;
  public apiPagination: any = {
    page: 1,
    limit: 20
  };
  public debounceTimer: any = '';
  public srchValue: string = "";
  public initScroll: boolean = false;
  public enablePagination: boolean = false;
  public isApiTriggered: boolean = false;
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.getCashDetailsList();
  }
  async onScroll(event: Event) {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.handleScroll(event);
    }, 800);
  }
  handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollHeight = target.scrollHeight - 2;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (this.initScroll) this.loadNextData();
    }
  }
  async loadNextData() {
    if (this.enablePagination && !this.isApiTriggered) {
      this.getCashDetailsList(this.apiPagination['page'] + 1, this.apiPagination.limit, this.srchValue)
    }
  }
  public isMorePage = false;
  getCashDetailsList(page: any = 1, limit: any = 20, search: any = '') {
    let obj: any = {
      page: page,
      limit: limit
    };
    if (search != '') obj['search'] = search;
    this.initScroll = true;
    if (page > 1) this.isMorePage = true;
    this.api.cashDetailsList(obj)?.then((res: any) => {
      this.enablePagination = this.utility.is_consist_more_data(res, limit);
      if (res['status'] == 'success') {
        if (page > 1) this.cashServies = [...this.cashServies, ...res['data']];
        else this.cashServies = res['data'];
        this.apiPagination['page'] = page;
      }
      this.isLoading = false;
      this.isMorePage = false;
    }).catch((error: any) => {
      console.log(error)
    });
  }
  navigation(path: string) {
    this.router.navigate([path]);
  }
  public deleteCashID: any = '';
  trashCashDetail(cashDataID: any) {
    this.showConfirm = true;
    this.deleteCashID = cashDataID;
  }
  editCashDetail(cashDataID: any) {
    let path = 'administration/cash-management/edit/' + cashDataID;
    this.router.navigate([path]);
  }
  viewCashDetail(cashDataID: any) {
    let path = 'administration/cash-management/list/' + cashDataID;
    this.router.navigate([path]);
  }
  showConfirm = false;

  handleConfirm(result: boolean) {
    this.showConfirm = false;
    if (result) {
      this.api.cashDetailsDelete({ cashDataID: +this.deleteCashID })?.then((res: any) => {
        if (res['status'] == 'success') {
          this.isLoading = true;
          this.getCashDetailsList();
        }
      }).catch((error: any) => {
        console.log(error)
      });
    }
    this.deleteCashID = '';
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
          if (String(term).length == 0 || String(term).length >= 2) this.getCashDetailsList(1, this.apiPagination.limit, term);
        });
    }
    this.searchChangeObserver.next(searchValue);
  }
}
