import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'select-widget',
  template: `
    <div [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
      <label *ngIf="options?.title"
             [attr.for]="'control' + _id"
             [class]="options?.labelHtmlClass"
             [style.display]="options?.notitle ? 'none' : ''"
             [innerHTML]="options?.title"></label>
        <select
          [attr.aria-describedby]="'control' + _id"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [disabled]="controlDisabled"
          [attr.multiple]="this.options?.multiple"
          [id]="'control' + _id"
          [name]="controlName"
          [ngClass]="setClassWidget()"
          (input)="updateValue($event)">
          <ng-container *ngIf="selectList">
            <option *ngFor="let selectItem of selectList"
                    [value]="selectItem.value"
                    [selected]="selectItem.value === controlValue">{{selectItem.text}}</option>
          </ng-container>
      </select> 
      <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
    </div>
    `,
  styleUrls: ["./select.component.css"]
})
export class SelectComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  valueType: string;
  controlName: string;
  selectList: any[] = [];
  _id: any;

  constructor(private wdgts: WidgetUIService) {
  }

  ngOnInit() {
    if (this.options) {
      if (this.options.hasOwnProperty("data")) {
        this.selectList = this.options["data"];
      }
    }
    this.wdgts.initWidget(this);
  }

  touchWidget() {
    if (!this.formControl.touched) {
      this.wdgts.touchWidget(this);
    }
  }

  updateValue(event) {
    console.log(event, "updateValue");
    let value = this.getValueFromEvent(event);
    this.touchWidget();
    this.wdgts.updateValue(this, value);
  }

  getValueFromEvent(event){
    if(this.options.multiple){
      let values: any = [];
      for(let option of event.target.options){
        if(option.selected){
          values.push(option.value);
        }
      }
      if(this.options.valueType == "string") values = values.toString();
      return values;
    }
    return event.target.value;
  }

  setClassWidget(){
    let widgetClasses = [];
    if(!this.formControl.valid && this.formControl.touched && this.formControl.errors){
      widgetClasses.push("errorWidget");
    }
    if(this.options){
      if(this.options.hasOwnProperty("fieldHtmlClass")){
        widgetClasses.push(this.options.fieldHtmlClass);
      }
    }
    return widgetClasses;
  }
}
