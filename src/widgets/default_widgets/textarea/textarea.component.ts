import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'input-widget',
  template: `
    <div [hidden]="options?.type == 'hidden'" [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
        <label *ngIf="options?.title"
               [attr.for]="'control' + _id + 'textarea'"
               [class]="options?.labelHtmlClass"
               [style.display]="options?.notitle ? 'none' : ''"
               [innerHTML]="options?.title"></label>
        <textarea
          [attr.maxlength]="options?.maxLength"
          [attr.minlength]="options?.minLength"
          [attr.pattern]="options?.pattern"
          [attr.placeholder]="options?.placeholder"
          [attr.readonly]="options?.readonly ? 'readonly' : null"
          [attr.required]="options?.required"
          [class]="options?.fieldHtmlClass"
          [disabled]="controlDisabled"
          [id]="'control' + _id + 'textarea'"
          [name]="controlName"
          [value]="controlValue"
          (blur)="touchWidget()"
          (input)="updateValue($event)"></textarea>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    `,
     styleUrls: ["./textarea.component.css"]
})
export class TextAreaComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  controlName: string;
  _id: any;

  constructor(private wdgts: WidgetUIService){

  }

  touchWidget(){
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  ngOnInit() { console.log(this.formControl, "InputString");
    this.wdgts.initWidget(this);
  }

  updateValue(event) { console.log(this, "updateValue");
    this.touchWidget();
    this.wdgts.updateValue(this, event.target.value);
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
