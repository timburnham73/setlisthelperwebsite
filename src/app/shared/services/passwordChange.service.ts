import {Injectable, Inject} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Password} from '../model/passordChange';
import {SLHHttpClient} from '../web/HttpClient';
import {HttpErrorResponse} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

declare var _: any;

@Injectable()
export class PasswordChangeService {
  
  private loggedInUser: User;
  actionUrl: string;

  constructor(private _http: SLHHttpClient,) {
    this.actionUrl = 'https://setlisthelper.azurewebsites.net/api/v2.0/Member';
  }

  
  changePassword(passwordModel: Password) {
    const jsonData = PasswordChange.toJson(passwordModel);
    return this._http.put(this.actionUrl, jsonData)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
