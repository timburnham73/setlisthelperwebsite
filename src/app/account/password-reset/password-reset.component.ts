import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.less']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  sendPasswordReset() {
    const formValue = this.form.value;
    /*this.authService.sendPasswordResetEmail(formValue.email)
      .subscribe(
        () =>this.router.navigate(['/login']),
        alert);*/
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors &&
      this.form.controls[field].errors[error];
  }

}
