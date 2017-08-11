import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'button-widget',
  template: `
    <div
      [class]="options?.htmlClass">
      <button
        [attr.readonly]="options?.readonly ? 'readonly' : null"
        [class]="options?.fieldHtmlClass"
        [disabled]="controlDisabled"
        [type]="type"
        (click)="clickedButton()"
        [attr.title]="options?.title"
      >
      <span *ngIf="options?.icon || options?.title"
            [class]="options?.icon"
            [innerHTML]="options?.title"></span>
    </button>
  </div>`,
  styleUrls: ["./button.component.css"]
})
export class ButtonComponent implements OnInit{
  formControl: AbstractControl;
  type: string;
  controlDisabled: boolean = false;
  options: null;
  @Output() clickWidget = new EventEmitter();

  constructor(private wdgts: WidgetUIService){}

  ngOnInit(){
    this.wdgts.initWidget(this);
  }

  clickedButton(){
    this.clickWidget.emit();
  }
}
