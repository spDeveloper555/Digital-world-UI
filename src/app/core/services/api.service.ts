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

  post(url: string, params: any) {
    try {
      const data = params;
      let headers: any = new HttpHeaders();
      return this.http.post(this.baseUrl + url, data, headers)
        .toPromise()
        .then()
        .catch();
    } catch (error) {
      return;
    }

  }
}
