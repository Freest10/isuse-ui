import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetUIService } from '../../../widget-ui.service';
/*[class]="options?.itemLabelHtmlClass +
                ((controlValue + '' === radioItem?.value + '') ?
                (' ' + options?.activeClass + ' ' + options?.style?.selected) :
                (' ' + options?.style?.unselected))"*/
@Component({
  selector: 'radio-widget',
  template: `
      <div [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
        <label *ngFor="let radioItem of radiosList"
               [attr.for]="'control' + _id + '/' + radioItem?.value"
               [ngClass]="setLabelClass()"  
        >
          <input type="radio"
                 [attr.aria-describedby]="'control' + _id"
                 [attr.readonly]="options?.readonly ? 'readonly' : null"
                 [attr.required]="options?.required"
                 [checked]="radioItem?.value === controlValue"
                 [class]="options?.fieldHtmlClass"
                 [disabled]="controlDisabled"
                 [id]="'control' + _id + '/' + radioItem?.value"
                 [name]="controlName"
                 [value]="radioItem?.value"
                 (change)="updateValue($event)">
          <span [innerHTML]="radioItem?.text" class="radioTitle"></span>
        </label>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
        <div class="clear"></div>
    </div>
    `,
      styleUrls: ["./radio.component.css"]
})
export class RadioComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  valueType: string;
  controlName: string;
  radiosList: any[] = [];
  _id: any;

  constructor(private wdgts: WidgetUIService){}

  ngOnInit() {
    if (this.options){
      if (this.options.hasOwnProperty("data")) {
        this.radiosList = this.options["data"];
      }else{
        console.error("Select component has not data!");
      }
    }
    this.wdgts.initWidget(this);
  }

  setLabelClass(){
    if(this.options.float == "left"){
      return "toLeft";
    }
  }

  touchWidget(){
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  updateValue(event) {
    this.touchWidget();
    this.wdgts.updateValue(this, event.target.value);
  }

}
