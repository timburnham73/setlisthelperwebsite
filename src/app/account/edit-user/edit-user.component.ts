import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {User} from '../../shared/model/user';
import {AuthService} from '../../shared/security/auth.service';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit {

  @ViewChild('editUserModal')
  modal: BsModalComponent;

  public myForm: FormGroup;
  public events: any[] = [];
  private user: User;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService
              ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

    });

    this.myForm = this.fb.group({
      emailAddress: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      firstName: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      lastName: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      role: ['user']
    });    
  }

  loadUser() {
    this.userService.getUser()
      .map((data) => {
        return data;
      })
      .subscribe(data => {
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.emailAddress = data.emailAddress;
      });

    /*(<FormControl>this.myForm.controls['emailAddress'])
      .setValue(user.emailAddress, {onlySelf: true});*/

    /*
    (<FormControl>this.myForm.controls['emailAddress'])
      .setValue(user.emailAddress, {onlySelf: true});
    (<FormControl>this.myForm.controls['firstName'])
      .setValue(user.firstName, {onlySelf: true});
    (<FormControl>this.myForm.controls['lastName'])
      .setValue(user.lastName, {onlySelf: true});
      /*
    //Only allow the user to change their own data.
    /*if(this.authService.id !== user.$key) {
      (<FormControl>this.myForm.controls['firstName']).disable();
      (<FormControl>this.myForm.controls['lastName']).disable();
      (<FormControl>this.myForm.controls['emailAddress']).disable();
      (<FormControl>this.myForm.controls['role']).enable();
    }else{
      (<FormControl>this.myForm.controls['firstName']).enable();
      (<FormControl>this.myForm.controls['lastName']).enable();
      (<FormControl>this.myForm.controls['emailAddress']).enable();
      (<FormControl>this.myForm.controls['role']).disable();
    }*/
  }

  save(user: User, isValid: boolean) {
    if (isValid) {
      if (user.emailAddress) {
        this.authService.updateEmail(user.emailAddress);
      }
      this.userService.updateUser(user);

      this.modal.close();
    }
  }

  isErrorVisible(field: string, error: string) {

    return this.myForm.controls[field].dirty
      && this.myForm.controls[field].errors &&
      this.myForm.controls[field].errors[error];
  }

  close() {
    this.modal.close();
  }

  open(user: User) {
    this.loadUser();
    this.modal.open('sm');
  }
}
