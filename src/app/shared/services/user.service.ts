import {Injectable, Inject} from '@angular/core';
import {User} from '../model/user';
import {AuthService} from '../security/auth.service';

declare var _: any;

@Injectable()
export class UserService {
  private loggedInUser: User;

  constructor(private authService: AuthService) {

  }

  getUser(userId: string) {

  }

  setLoggedInUser(user) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  signUpUser(user: User, password: string) {

  }

  completeUserInvitation(emailAddress: string, userId: string) {

  }

  updateUser(user: User) {

  }

  changePassword(user: User) {

  }
}
