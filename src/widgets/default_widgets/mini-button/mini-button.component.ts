import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetUIService } from '../../../widget-ui.service';
const imageArr= require('../../../images/right-arr.gif');

@Component({
  selector: 'mini-button-widget',
  template: `
    <div
      [class]="options?.htmlClass"
      >
        <button
            [attr.readonly]="options?.readonly ? 'readonly' : null"
            [class]="options?.fieldHtmlClass"
            [disabled]="controlDisabled"
            [type]="'button'"
            (click)="clickedButton()"
            [attr.title]="options?.title"
          >
        </button>
    </div>
  `,
  styles: ["button {background: url("+imageArr+");width: 16px;height: 16px;border:none;display:block;outline:none;margin-top: 14px;margin-left: 7px;}"]
})
export class MiniButtonComponent implements OnInit{
  formControl: AbstractControl;
  type: string;
  controlDisabled: boolean = false;
  options: any;
  @Output() clickWidget = new EventEmitter();

  constructor(private wdgts: WidgetUIService){}

  ngOnInit(){
    if(this.formControl){
      this.wdgts.initWidget(this);
    }
  }

  clickedButton(){
    this.clickWidget.emit();
  }

}
