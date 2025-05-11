import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  isSideNavOpened = new BehaviorSubject(false);
  navList = new BehaviorSubject([]);
  activePage = new BehaviorSubject({});
  constructor(public http: HttpClient) { }
  getJsonData() {
    this.http.get<any[]>('src/assets/jsons/data.json').subscribe(data => {
      console.log(data);
    });
  }
  setActivePage(page: any) {
    this.activePage.next(page);
  }
}
