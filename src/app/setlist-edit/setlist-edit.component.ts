import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SetlistService} from '../shared/services/setlist.service';
import {Setlist} from '../shared/model/setlist';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {MatDatepicker} from '@angular/material';
import {Song} from '../shared/model/song';
@Component({
  selector: 'app-setlist-edit',
  templateUrl: './setlist-edit.component.html',
  styleUrls: ['setlist-edit.component.less']
})
export class SetlistEditComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @ViewChild('setlistEditModal')
  modal: BsModalComponent;

  public myForm: FormGroup;
  public events: any[] = [];

  private isNew: boolean;
  public setlist: Setlist;
  public date: Date = new Date(2016, 5, 10);

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private setlistService: SetlistService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {

    });

    this.isNew = false;
    this.myForm = this.fb.group({
      Name: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      GigLocation: ['', [<any>Validators.required, <any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      GigDate: [new Date(), []],
      GigTime: [new Date(), []],
      LastEdit: ['', []],
      CreatedByUserId: ['', []],
      CreatedByUserName: ['', []],
      DateCreated: ['', []],
      Deleted: ['', []],
      Deprecated: ['', []],
      MakePublic: ['', []]
    });
  }

  loadSetlist(setlist) {
    this.myForm.reset();
    if (setlist.SetListId && setlist.SetListId !== -1) {
      (<FormControl>this.myForm.controls['Name'])
        .setValue(setlist.Name, {onlySelf: true});

      (<FormControl>this.myForm.controls['GigLocation'])
        .setValue(setlist.GigLocation, {onlySelf: true});


      (<FormControl>this.myForm.controls['GigDate'])
        .setValue(new Date(setlist.GigDate), {onlySelf: true});

      const gigDate = new Date(setlist.GigDate);
      const gigHour = gigDate.getHours();
      const gigMinutes = gigDate.getMinutes();
      (<FormControl>this.myForm.controls['GigTime'])
        .setValue(`${this.pad(gigHour, 2)}:${this.pad(gigMinutes, 2)}`, {onlySelf: true});

      (<FormControl>this.myForm.controls['LastEdit'])
        .setValue(setlist.LastEdit, {onlySelf: true});
      (<FormControl>this.myForm.controls['CreatedByUserId'])
        .setValue(setlist.CreatedByUserId, {onlySelf: true});
      (<FormControl>this.myForm.controls['CreatedByUserName'])
        .setValue(setlist.CreatedByUserName, {onlySelf: true});
      (<FormControl>this.myForm.controls['DateCreated'])
        .setValue(setlist.DateCreated, {onlySelf: true});
      (<FormControl>this.myForm.controls['Deleted'])
        .setValue(setlist.Deleted, {onlySelf: true});
      (<FormControl>this.myForm.controls['Deprecated'])
        .setValue(setlist.Deprecated, {onlySelf: true});
      (<FormControl>this.myForm.controls['MakePublic'])
        .setValue(setlist.MakePublic, {onlySelf: true});

      this.isNew = false;
    } else {
      (<FormControl>this.myForm.controls['Name'])
        .setValue('', {onlySelf: true});

      (<FormControl>this.myForm.controls['GigLocation'])
        .setValue('', {onlySelf: true});

      const today = Date.now();
      (<FormControl>this.myForm.controls['GigDate'])
        .setValue(new Date(today), {onlySelf: true});

      const gigHour = '22';
      const gigMinutes = '00';
      (<FormControl>this.myForm.controls['GigTime'])
        .setValue(`${this.pad(gigHour, 2)}:${this.pad(gigMinutes, 2)}`, {onlySelf: true});

      (<FormControl>this.myForm.controls['LastEdit'])
        .setValue(new Date(today), {onlySelf: true});
      (<FormControl>this.myForm.controls['CreatedByUserId'])
        .setValue('', {onlySelf: true});
      (<FormControl>this.myForm.controls['CreatedByUserName'])
        .setValue('', {onlySelf: true});
      (<FormControl>this.myForm.controls['DateCreated'])
        .setValue(new Date(today), {onlySelf: true});
      (<FormControl>this.myForm.controls['Deleted'])
        .setValue(false, {onlySelf: true});
      (<FormControl>this.myForm.controls['Deprecated'])
        .setValue(false, {onlySelf: true});
      (<FormControl>this.myForm.controls['MakePublic'])
        .setValue(false, {onlySelf: true});
      this.isNew = true;
    }
  }


  save(model: any, isValid: boolean) {
    model.GigDate = this.getJSONDateAndTime(new Date(model.GigDate), model.GigTime);
    delete model.GigTime;
    if (this.isNew === true) {
      model.createDate = new Date();
      this.setlistService.createSetlist(model)
        .do(updatedSetlist => console.log(`update song ${updatedSetlist}`))
        .subscribe(newSetlist => {
          const returnSetlist: Setlist = newSetlist;
          this.closeModal.emit(returnSetlist);
          this.modal.close();
        });
    } else {
      this.setlistService.updateSetlist(this.setlist['SetListId'], model)
        .do(updatedSetlist => console.log(`update song ${updatedSetlist}`))
        .subscribe(updatedSetlist => {
          const returnSetlist: Setlist = updatedSetlist;
          this.closeModal.emit(returnSetlist);
          this.modal.close();
        });
    }
  }

  getJSONDateAndTime(gigDate: Date, gigTime: string) {
    const gigTimeSplit = gigTime.split(':');
    gigDate.setHours(Number(gigTimeSplit[0]));
    gigDate.setMinutes(Number(gigTimeSplit[1]));
    const timeString = this.pad(gigDate.getHours(), 2) + ':' + this.pad(gigDate.getMinutes(), 2) + ':00.00';
    const year = gigDate.getFullYear();
    const month = gigDate.getMonth() + 1; // Jan is 0, dec is 11
    const day = gigDate.getDate();
    const dateString = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
    const combined = `${dateString}T${timeString}`; // 2015-02-03T15:01:39.33
    return combined;

  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  isErrorVisible(field: string, error: string) {

    return this.myForm.controls[field].dirty
      && this.myForm.controls[field].errors &&
      this.myForm.controls[field].errors[error];
  }

  close() {
    this.modal.close();
  }

  open(setlist) {
    this.setlist = setlist;
    this.loadSetlist(this.setlist);
    this.modal.open('sm');
  }


}
