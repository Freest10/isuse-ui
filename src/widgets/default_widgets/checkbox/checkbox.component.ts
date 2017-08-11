import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'checkbox-widget',
  template: `
      <div [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
        <label
          [attr.for]="'control' + _id"
          [class]="options?.itemLabelHtmlClass">
          <input
            [attr.aria-describedby]="'control' + _id"
            [checked]="isChecked ? 'checked' : null"
            [class]="options?.fieldHtmlClass + (isChecked ?
 (' ' + options?.activeClass + ' ' + options?.style?.selected) :
 (' ' + options?.style?.unselected))"
            [disabled]="controlDisabled"
            [id]="'control' + _id"
            [name]="controlName"
            [readonly]="options?.readonly ? 'readonly' : null"
            [value]="controlValue"
            type="checkbox"
            (change)="updateValue($event)">
          <span *ngIf="options?.title"
                class="checkBoxTitle"
                [innerHTML]="options?.title"></span>
        </label>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    `,
    styleUrls: ["./checkbox.component.css"]
})
export class CheckBoxComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  options: null;
  controlName: string;
  controlDisabled: boolean = false;
  _id: any;
  valueType: string = "boolean";
  trueValue: any = true;
  falseValue: any = false;
  lastValidNumber: number;

  constructor(private wdgts: WidgetUIService) {}

  touchWidget(){
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  ngOnInit() {
    this.wdgts.initWidget(this);
    /*if (this.controlValue === null || this.controlValue === undefined) {
      this.controlValue = this.options.title;
    }*/
  }

  updateValue(event) {
    event.preventDefault();
    this.touchWidget();
    this.wdgts.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
  }

  get isChecked() {
    return this.controlValue;
  }

  /*updateValue(event) {
    this.touchWidget();
    this.wdgts.updateValue(this, event.target.value);
  }*/

}


/*
* @Component({
 selector: 'checkbox-widget',
 template: `
 <label
 [attr.for]="'control' + layoutNode?._id"
 [class]="options?.itemLabelHtmlClass">
 <input
 [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
 [checked]="isChecked ? 'checked' : null"
 [class]="options?.fieldHtmlClass + (isChecked ?
 (' ' + options?.activeClass + ' ' + options?.style?.selected) :
 (' ' + options?.style?.unselected))"
 [disabled]="controlDisabled"
 [id]="'control' + layoutNode?._id"
 [name]="controlName"
 [readonly]="options?.readonly ? 'readonly' : null"
 [value]="controlValue"
 type="checkbox"
 (change)="updateValue($event)">
 <span *ngIf="options?.title"
 [style.display]="options?.notitle ? 'none' : ''"
 [innerHTML]="options?.title"></span>
 </label>`,
 })
 export class CheckboxComponent implements OnInit {
 formControl: AbstractControl;
 controlName: string;
 controlValue: any;
 controlDisabled: boolean = false;
 boundControl: boolean = false;
 options: any;
 trueValue: any = true;
 falseValue: any = false;
 @Input() formID: number;
 @Input() layoutNode: any;
 @Input() layoutIndex: number[];
 @Input() dataIndex: number[];

 constructor(
 private jsf: JsonSchemaFormService
 ) { }

 ngOnInit() {
 this.options = this.layoutNode.options || {};
 this.jsf.initializeControl(this);
 if (this.controlValue === null || this.controlValue === undefined) {
 this.controlValue = this.options.title;
 }
 }

 updateValue(event) {
 event.preventDefault();
 this.jsf.updateValue(this, event.target.checked ? this.trueValue : this.falseValue);
 }

 get isChecked() {
 return this.jsf.getControlValue(this) === this.trueValue;
 }
 }
* */
