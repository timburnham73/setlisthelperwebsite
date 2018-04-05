import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/security/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }


  login() {
    const formValue = this.form.value;
    this.message = '';
    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => this.router.navigate(['/songs']),
        err => this.message = 'The password is invalid.'
      );
  }

  isErrorVisible(field: string, error: string) {

    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];
  }

  keyDownFunction(event) {
    if(event.keyCode === 13) {
      this.login();
    }
  }

}
