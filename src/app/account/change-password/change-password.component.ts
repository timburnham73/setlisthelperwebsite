

import {Component, OnInit, ViewChild} from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PasswordChange} from '../../shared/model/passwordChange';
import {PasswordChangeService} from '../../shared/services/passwordChange.service';
import {PasswordChangeResults} from '../../shared/model/passwordChangeResults';

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
  public results: PasswordChangeResults;
  public isError: boolean;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private passwordService: PasswordChangeService
              ) {
    this.passwordModal = new PasswordChange("","","");
    this.results = new PasswordChangeResults(false,"");

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.accountId = params['accountid'];
    });


    this.myForm = this.fb.group({
      currentPassword: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      newPassword: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      confirmPassword: ['', [<any>Validators.required, <any>Validators.minLength(1)]]
    });    
  }

  isPasswordMatch() {
    const val = this.myForm.value;
    return val && (val.confirmPassword == "" || val.newPassword == val.confirmPassword);
  }

  save(model: any, isValid: boolean) {
      this.passwordService.changePassword(model).subscribe(data => {
          this.results = PasswordChangeResults.fromJson(data); 
          console.log(this.results);
          if(this.results.isSuccess){
            this.passwordModal.currentPassword = "";
            this.passwordModal.newPassword = "";
            this.passwordModal.confirmPassword = "";
            this.isError = false;
            this.modal.close();  
          }
          else{
            this.isError = true;
            this.errorMessage = this.results.results ;
          }
          
        });
  }

  isErrorVisible(field: string, error: string) {

    //return this.myForm.controls[field].dirty
    //    && this.myForm.controls[field].errors &&
    //    this.myForm.controls[field].errors[error];
    return false;
  }

  close() {
    this.modal.close();
  }

  open(user) {
    this.modal.open('sm');
  }

}
