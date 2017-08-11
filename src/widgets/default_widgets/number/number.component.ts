import { Component,  ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'number-widget',
  template: `
      <div [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
          <label *ngIf="options?.title"
                 [attr.for]="'control' + _id"
                 [class]="options?.labelHtmlClass"
                 [style.display]="options?.notitle ? 'none' : ''"
                 [innerHTML]="options?.title"></label>
          <input
            [attr.max]="options?.maxLength"
            [attr.min]="options?.minLength"
            [attr.placeholder]="options?.placeholder"
            [attr.required]="options?.required"
            [attr.readonly]="options?.readonly ? 'readonly' : null"
            [attr.step]="options?.multipleOf || options?.step || 'any'"
            [disabled]="controlDisabled"
            [id]="'control' + _id"
            [name]="controlName"
            [readonly]="options?.readonly ? 'readonly' : null"
            [type]="options?.type === 'range' ? 'range' : 'number'"
            [value]="controlValue"
            (input)="updateValue($event)"
            (keydown)="validateInput($event)"
            [ngClass]="setClassWidget()"
            (keyup)="validateNumber($event)"
            (blur)="touchWidget()"
          >
          <div  class="mini-button-wrap" >
            <ng-container #widgetContainer></ng-container>
          </div>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    `,
    styleUrls: ["./number.component.css"]
})
export class NumberComponent implements OnInit {
  @Output() clickWidget = new EventEmitter()
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;
  newComponent: any;
  wdlibs: any;
  formControl: AbstractControl;
  controlValue: any = "";
  options: any = {};
  controlName: string;
  controlDisabled: boolean = false;
  _id: any;
  allowDecimal: boolean = true;
  valueType: string;
  allowExponents: boolean = false;
  allowNegative: boolean = true;
  lastValidNumber: number;

  constructor(private componentFactory: ComponentFactoryResolver,
              private wdgts: WidgetUIService){}

  touchWidget(){
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  ngOnInit() {
    this.wdgts.initWidget(this);
    if (this.options["type"] === 'integer') { this.allowDecimal = false; }
    if (!this.newComponent && this.options.button) {
      this.createButtonWidgetComponent();
      this.clickedWidgetSubscribe();
    }
  }

  validateInput(event) {
    const val = event.target.value;
    if (/^Digit\d$/.test(event.code)) { return true; }
    if (/^Numpad\d$/.test(event.code)) { return true; }
    if (/^Arrow/.test(event.code)) { return true; }
    if (!this.wdgts.inArray(event.code, ['Backspace', 'Delete', 'Enter', 'Escape',
        'NumpadEnter', 'PrintScreen', 'Tab'])) { return true; }
    if (event.ctrlKey || event.altKey || event.metaKey) { return true; }
    if (this.allowDecimal && event.key === '.' && val.indexOf('.') === -1) { return true; }
    if (this.allowExponents) {
      const hasExponent = /e/i.test(val);
      if (/^e$/i.test(event.key) && !hasExponent && val) { return true; }
      if (event.key === '-') {
        const minusCount = (val.match(/\-/g) || []).length;
        if ((this.allowNegative || hasExponent) && !minusCount) { return true; }
        if (this.allowNegative && hasExponent && minusCount === 1) { return true; }
      }
    } else if (this.allowNegative && event.key === '-' && val.indexOf('-') === -1) {
      return true;
    }
    return false;
  }

  validateNumber(event) {
    // TODO: This only works for input type=text - make it work for type=number
    const val = event.target.value;
    if (!isNaN(val) || val === '' || val === '.' || val === '-' || val === '-.' ||
      (val.length > 1 && val.slice(-1).toLowerCase() === 'e') ||
      (val.length > 2 && val.slice(-2).toLowerCase() === 'e-')
    ) {
      this.lastValidNumber = val;
    } else {
      this.wdgts.updateValue(this, this.lastValidNumber);
    }
  }

  updateValue(event) {
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
        widgetClasses.push(this.options["fieldHtmlClass"]);
      }
    }
    return widgetClasses;
  }

  createButtonWidgetComponent(){
    this.newComponent = this.widgetContainer.createComponent(
      this.componentFactory.resolveComponentFactory(this.wdlibs.activeWidgets["miniButton"])
    );
  }

  clickedWidgetSubscribe(){
    if(this.newComponent.instance.clickWidget){
      this.newComponent.instance.clickWidget.subscribe(()=>{this.clickWidget.emit()})
    }
  }

}
