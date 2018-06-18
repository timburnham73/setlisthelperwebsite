import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SetlistService} from '../shared/services/setlist.service';
import {Setlist} from '../shared/model/setlist';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-setlist-edit',
  templateUrl: './setlist-edit.component.html',
  styleUrls: ['setlist-edit.component.less']
})
export class SetlistEditComponent implements OnInit {

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
      name: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      gigLocation: ['', [<any>Validators.required, <any>Validators.minLength(1), <any>Validators.maxLength(255)]],
      gigDate: [new Date(), []],
      gigTime: [new Date(), []]
    });
  }

  loadSetlist(setlist){
      if(setlist.$key) {
        (<FormControl>this.myForm.controls['name'])
          .setValue(setlist.name, {onlySelf: true});

        (<FormControl>this.myForm.controls['gigLocation'])
          .setValue(setlist.gigLocation, {onlySelf: true});


        (<FormControl>this.myForm.controls['gigDate'])
          .setValue(new Date(setlist.gigDate), {onlySelf: true});

        (<FormControl>this.myForm.controls['gigTime'])
          .setValue(new Date(setlist.gigDate), {onlySelf: true});

        this.isNew = false;
      } else {
        this.isNew = true;
      }
  }

  save(model: any, isValid: boolean) {

    const gigDate = this.getGigDateMilliSeconds(new Date(model.gigDate), new Date(model.gigTime));
    model.gigDate = gigDate;
    delete model.gigTime;

    model.lastModified = new Date();
    if (this.isNew === true) {
      model.createDate = new Date();
      this.setlistService.createSetlist(model);
    } else {
      this.setlistService.updateSetlist(this.setlist.setlistId, model);
    }
    this.modal.close();
  }

  getGigDateMilliSeconds(gigDate: Date, gigTime: Date) {
    const timeString = gigTime.getHours() + ':' + gigTime.getMinutes() + ':00';

    const year = gigDate.getFullYear();
    const month = gigDate.getMonth() + 1; // Jan is 0, dec is 11
    const day = gigDate.getDate();
    const dateString = '' + year + '-' + month + '-' + day;
    const combined = new Date(dateString + ' ' + timeString);
    return combined.getTime();

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
    this.loadSetlist(setlist);
    this.modal.open('sm');
  }


}
