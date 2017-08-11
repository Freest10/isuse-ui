import {
  Component, Input, ComponentFactoryResolver,
  OnChanges, OnInit, ViewChild, ViewContainerRef,
  OnDestroy, Output, EventEmitter
} from '@angular/core';
import { WidgetUIService } from './widget-ui.service';
import { WidgetLibraryService } from './widgets/widget-library.service';

@Component({
  selector: 'widget',
  template: `<ng-container #widgetContainer ></ng-container>`,
  providers: [ WidgetUIService ],
})

export class WidgetUIComponent implements OnInit, OnChanges, OnDestroy {
  typeWidget: string;
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;
  newComponent: any;
  @Input() options: Object;
  @Output() clickWidget = new EventEmitter();


  constructor(
    private componentFactory: ComponentFactoryResolver,
    private wdlibs: WidgetLibraryService,
    private wuis: WidgetUIService
  ) { }


  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngOnDestroy(){
    this.clickedWidgetUnSubscribe();
  }

  setActiveWidgetsToWdgts(){
    this.wdlibs.setActiveWidgets();
  }

  updateComponent() {
    if (!this.newComponent) {
      this.createWidgetComponent();
      this.setFormControl();
      this.setValueType();
      this.setOptions();
      this.clickedWidgetSubscribe();
    }
  }

  createWidgetComponent(){
    this.newComponent = this.widgetContainer.createComponent(
      this.componentFactory.resolveComponentFactory(this.wdlibs.activeWidgets[this.options["type"]])
    );
  }

  setFormControl(){
    if(this["options"]["_formControl"]) this.newComponent.instance["formControl"] = this["options"]["_formControl"];
  }

  setValueType(){
    if(this["options"]["valueType"]){
      this.newComponent.instance["valueType"] = this["options"]["valueType"];
    }else{
      this.newComponent.instance["valueType"] = "string";
    }
  }

  setOptions(){
    this.newComponent.instance["options"] = this["options"];
    this.newComponent.instance["wdlibs"] = this.wdlibs;
  }

  clickedWidgetSubscribe(){
    if(this.newComponent.instance.clickWidget){
      this.newComponent.instance.clickWidget.subscribe(()=>{this.clickWidget.emit()})
    }
  }


  clickedWidgetUnSubscribe(){
    if(this.newComponent.instance.clickWidget){
      this.newComponent.instance.clickWidget.unsubscribe();
    }
  }
}
