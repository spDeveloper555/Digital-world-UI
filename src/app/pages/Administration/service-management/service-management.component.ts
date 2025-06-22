import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'e-seva-service-management',
  templateUrl: './service-management.component.html',
  styleUrl: './service-management.component.css'
})
export class ServiceManagementComponent {
  public servies: any = [];
  public isLoading: boolean = true;
  constructor(
    public api: ApiService,
    public utility: UtilityService,
    public router: Router
  ) { }
  navigation(path: string) {
    this.router.navigate([path]);
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
          // if (String(term).length == 0 || String(term).length >= 2) this.getCashDetailsList(1, this.apiPagination.limit, term);
        });
    }
    this.searchChangeObserver.next(searchValue);
  }
}
