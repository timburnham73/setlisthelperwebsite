import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Created by tim on 10/27/16.
 */
export class DropdownValue {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'dropdown',
  template: `
      <button type="button" class="note-btn btn btn-sm dropdown-toggle" tabindex="-1"
                              data-toggle="dropdown" title="" data-original-title="Style">
      {{prependName}} {{selectedValue}}
      <span class="caret"></span>
    </button>
    <div class="dropdown-menu dropdown-style">
      <li *ngFor="let value of values">
        <a href="javascript:void(0)" (click)="selectItem(value)" data-value="value.value">{{prependName}} {{value.name}}</a>
      </li>
    </div>
  `
})
export class DropdownComponent {

  @Input()
  values: DropdownValue[];

  @Input()
  selectedValue: string;

  @Input()
  prependName: string;

  @Output()
  select: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.select = new EventEmitter();

  }

  selectItem(dropDownValue) {
    this.selectedValue = dropDownValue.name;
    this.select.emit(dropDownValue);
  }
}
