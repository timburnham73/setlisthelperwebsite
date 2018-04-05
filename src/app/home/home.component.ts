import {Component, OnInit, ViewChild} from '@angular/core';




import {Router} from '@angular/router';
import {EditAccountComponent} from './edit-account/edit-account.component';
import {AuthService} from '../shared/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild('editAccountModal') editAccountDialog: EditAccountComponent;

  constructor(private auth: AuthService,
              private router: Router) {

  }

  ngOnInit() {

  }

  onCardClick() {

  }

  onShowDetails() {

  }
  createAccount() {
    this.editAccountDialog.open();
  }

  editAccount() {
    this.editAccountDialog.open();
  }

}
