import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from '../../shared/security/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.less']
})
export class RegisterComponent  {

  form:FormGroup;
  public message:string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      accountName: ['', Validators.required, Validators.maxLength(255)],
      firstName: ['', Validators.required, Validators.maxLength(255)],
      lastName: ['', Validators.required, Validators.maxLength(255)],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }

  isErrorVisible(field: string, error: string) {

    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];
  }

  signUp() {
    const val = this.form.value;
    this.message = '';
  }


}
