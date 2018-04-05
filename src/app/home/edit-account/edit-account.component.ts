import {Component, OnInit, ViewChild} from '@angular/core';

import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BsModalComponent} from 'ng2-bs3-modal/modal/modal';
import {AuthService} from '../../shared/security/auth.service';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.less']
})
export class EditAccountComponent implements OnInit {

  @ViewChild('editAccountModal')
  modal: BsModalComponent;
  public errorMessage: string;

  public myForm: FormGroup;
  public events: any[] = [];
  public isNew = false;
  private userId: string;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService) {

  }

  ngOnInit() {


    this.userId = '';
    this.myForm = this.fb.group({
      name: ['']
    });
  }



  save(model: any, isValid: boolean) {

    if ( this.isNew ) {
      this.modal.close();
    } else {
      // if (this.account) {
        this.modal.close();
      // }
    }

  }

  isErrorVisible(field: string, error: string) {

    return this.myForm.controls[field].dirty
        && this.myForm.controls[field].errors &&
        this.myForm.controls[field].errors[error];

  }

  loadAccount() {
      (<FormControl>this.myForm.controls['accountName'])
        .setValue('test', {onlySelf: true});
      this.isNew = false;
    /*}
    else {
      this.isNew = true;
    }*/
  }

  close() {
    this.modal.close();
  }

  open() {
    this.isNew = true;

    this.modal.open('sm');
  }

}
