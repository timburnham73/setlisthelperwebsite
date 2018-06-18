import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SLHHttpClient {

  constructor(private http: HttpClient) {}

  getAuthTokenInfo() {
    const jwt = localStorage.getItem('authToken');
    let httpOptions;
    if (jwt) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  'Bearer ' + jwt,
        })
      };
    }
    return httpOptions;
  }

  get(url) {
    const options = this.getAuthTokenInfo();
    return this.http.get(url, options);
  }

  post(url, data) {
    const options  = this.getAuthTokenInfo();
    return this.http.post(url, data, options);
  }

  put(url, data) {
    const options  = this.getAuthTokenInfo();
    return this.http.put(url, data, options);
  }

  delete(url) {
    const options  = this.getAuthTokenInfo();
    return this.http.delete(url, options);
  }
}
