import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = 'http://localhost:3000/api/';

  constructor(public http: HttpClient) { }
  login(data: any) {
    return this.post('login', data)
  }
  register(data: any) {
    return this.post('register', data)
  }
  profileView(data: any) {
    return this.post('profile/view', data)
  }
  cashDetailsAdd(data: any) {
    return this.post('administration/cash_detail/create', data)
  }
  cashDetailsList(data: any) {
    return this.post('administration/cash_detail/list', data)
  }
  cashDetailsEdit(data: any) {
    return this.post('administration/cash_detail/update', data)
  }
  cashDetailsDelete(data: any) {
    return this.post('administration/cash_detail/delete', data)
  }
  customerDetailsAdd(data: any) {
    return this.post('administration/customer_detail/create', data)
  }
  customerDetailsList(data: any) {
    return this.post('administration/customer_detail/list', data)
  }
  customerDetailsEdit(data: any) {
    return this.post('administration/customer_detail/update', data)
  }
  customerDetailsDelete(data: any) {
    return this.post('administration/customer_detail/delete', data)
  }
  userList(data: any) {
    return this.post('user/list', data)
  }

  post(url: string, params: any) {
    try {
      const data = params;
      let token = localStorage.getItem('userToken');

      let headers: any = new HttpHeaders({
        'token': token ?? ''
      });
      return this.http.post(this.baseUrl + url, data, { headers })
        .toPromise()
        .then()
        .catch();
    } catch (error) {
      return;
    }

  }
}
