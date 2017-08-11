import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { WidgetLibraryService } from '../../widget-library.service';
import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'input-widget',
  template: `
    <div [hidden]="options?.type == 'hidden'" [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
        <label *ngIf="options?.title"
               [attr.for]="'control' + _id"
               [class]="options?.labelHtmlClass"
               [style.display]="options?.notitle ? 'none' : ''"
               [innerHTML]="options?.title"></label>
        <input
          [value]="controlValue"
          (input)="updateValue($event)"
          [id]="'control' + _id"
          [attr.maxlength]="options?.maxLength"
          [attr.minlength]="options?.minLength"
          [attr.placeholder]="options?.placeholder"
          [attr.required]="options?.required"
          [ngClass]="setClassWidget()"
          [disabled]="controlDisabled"
          (blur)="touchWidget()"
        />
        <div  class="mini-button-wrap" >
          <ng-container #widgetContainer></ng-container>
        </div>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    `,
     styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  @Output() clickWidget = new EventEmitter()
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;
  newComponent: any;
  wdlibs: any;
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  controlName: string;
  _id: any;

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private wdgts: WidgetUIService
  ) {}

  touchWidget(){
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  ngOnInit() {
    this.wdgts.initWidget(this);
    if (!this.newComponent && this.options.button) {
      this.createButtonWidgetComponent();
      this.clickedWidgetSubscribe();
    }
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
