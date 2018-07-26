

import {Component, OnInit, ViewChild} from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PasswordChange} from '../../shared/model/passwordChange';
import {PasswordChangeService} from '../../shared/services/passwordChange.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('changePasswordModal')
  modal: BsModalComponent;
  public errorMessage: string;

  public myForm: FormGroup;
  public passwordModal: PasswordChange;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private passwordService: PasswordChangeService
              ) {
    this.passwordModal = new PasswordChange("","","");

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.accountId = params['accountid'];
    });


    this.myForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });    
  }

  isPasswordMatch() {
    const val = this.myForm.value;
    return val && val.password && val.password == val.confirm;
  }

  save(model: any, isValid: boolean) {


    /*this.authService.changePassword(model.password)
      .subscribe(
        () => this.modal.close(),
        (error) => this.errorMessage = error
      );*/

  }

  isErrorVisible(field: string, error: string) {

    return this.myForm.controls[field].dirty
        && this.myForm.controls[field].errors &&
        this.myForm.controls[field].errors[error];

  }

  close() {
    this.modal.close();
  }

  open(user) {
    this.modal.open('sm');
  }

}
