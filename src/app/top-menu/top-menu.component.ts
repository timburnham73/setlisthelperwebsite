import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {User} from '../shared/model/user';
import {AuthService} from '../shared/security/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.less']
})
export class TopMenuComponent implements OnInit {

  // @ViewChild('editUser') editUserDialog: EditUserComponent;
  // @ViewChild('changePassword') changePasswordDialog: ChangePasswordComponent;

  @Input()
  showlinks: boolean;

  public user: User;

  constructor(public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute) {
    this.showlinks = true;

  }

  public accountId: string;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountid'];
    });
  }

  logout() {
    // this.authService.logout();
    return this.router.navigate(['/login']);

  }
  onChangePassword() {
    // this.changePasswordDialog.open(this.user);
  }

  onEditProfile() {
    // this.editUserDialog.open(this.user);
  }

}
