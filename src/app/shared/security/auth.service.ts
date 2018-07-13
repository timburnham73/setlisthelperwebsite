import {Injectable, Inject} from '@angular/core';

import {Router} from '@angular/router';
import {AuthInfo} from './auth-info';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  private _http: HttpClient;
  constructor(protected http: HttpClient,
              private router: Router) {
    this._http = http;
  }

  get authenticated(): boolean {
    // return this.authState !== null;
    return true;
  }

  updateEmail(emailAddress: string) {

    // return this.fromFirebaseAuthPromise(this.authState.auth.updateEmail(emailAddress));
  }

  changePassword(password:string) {

    // return this.fromFirebaseAuthPromise(this.authState.auth.updatePassword(password));
  }

  signUp(email, password) {
    // return this.fromFirebaseAuthPromise(this.auth.createUser({email, password}));
  }

  sendPasswordResetEmail(emailAddress){

    // return this.fromPromise(this.firebaseApp.auth().sendPasswordResetEmail(emailAddress));
  }

  signOut(): void {
    // this.auth.logout();
  }

  login(username, password): Observable<any> {
    const headers = new Headers();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };

    const body = 'username=' + username + '&password=' + password + '&grant_type=password';

    return this._http.post('https://setlisthelper.azurewebsites.net/token', body, httpOptions )
      .map((response: Response) => {
        const responseJson: any = response;
        localStorage.setItem('username', username);
        localStorage.setItem('authToken', responseJson.access_token);
        localStorage.setItem('authTokenExpiration', responseJson.expires_in);
      });
  }

  logout() {
    // return this.auth.logout();
  }

  _errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Internal server error');
  }
}
