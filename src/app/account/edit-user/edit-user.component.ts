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
    this.user = new User("", "", "", "","","");
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
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser()
      .map((data) => {
        return data;
      })
      .subscribe(data => {
        this.user.firstName = data.FirstName;
        this.user.lastName = data.LastName;
        this.user.emailAddress = data.Email;
      });

    
      
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
      this.userService.updateUser(user);
      this.loadUser();
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
    
    this.myForm.reset();

    (<FormControl>this.myForm.controls['emailAddress'])
      .setValue(this.user.emailAddress);
    (<FormControl>this.myForm.controls['firstName'])
      .setValue(this.user.firstName, {onlySelf: true});
    (<FormControl>this.myForm.controls['lastName'])
      .setValue(this.user.lastName, {onlySelf: true});
    this.modal.open('sm');
  }
}
