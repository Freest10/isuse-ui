import { Component, OnInit }                        from '@angular/core';
import { AbstractControl }                          from '@angular/forms';
import { WidgetUIService }                          from '../../../widget-ui.service';
import {Http, URLSearchParams}                      from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'input-autocomplete-widget',
  template: `
    <div [hidden]="options?.type == 'hidden'" class="wrap-widget">
      <div [class]="options?.htmlClass" (document:click)="documentClick()">
        <label *ngIf="options?.title"
               [attr.for]="'control' + _id"
               [class]="options?.labelHtmlClass"
               [style.display]="options?.notitle ? 'none' : ''"
               [innerHTML]="options?.title"></label>
        <input
          [value]="getValueByControlValue(controlValue)"
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
        <button
          [type]="'button'"
          [style.background-image]="'url(' + imageArrow + ')'"
          (click)="toggleDropDownMenu($event)"
        >
        </button>
        <ul class="autoCompleteListBlock" *ngIf="selectList && showAutoComplete">
          <li *ngFor="let selectItem of selectList" (click)="selectedItem(selectItem)">
            {{selectItem.text}}
          </li>
        </ul>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    </div>
    `,
     styleUrls: ["./input-autocomplete.component.css"]
})
export class AutoCompleteInputComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  controlName: string;
  selectList: any[]= [];
  showAutoComplete: boolean = false;
  imageArrow = require('../../../images/down-arr.gif');
  _id: any;
  inputValue:string = "";

  constructor(
    private wdgts: WidgetUIService,
    private http: Http
  ){}

  ngOnInit() {
    if (this.options.hasOwnProperty("data") && !this.options.requestData) {
      this.selectList = this.options["data"];
    }
    this.wdgts.initWidget(this);
  }

  touchWidget() {
    if(!this.formControl.touched){
      this.wdgts.touchWidget(this);
    }
  }

  setSelectListByRequest(){
    this.getRequestSelectList().subscribe(
      (response) =>  {this.selectList = response.data },
      (error) =>  {console.error("Bad request")}
    );
  }

  getRequestSelectList(){
    return this.http.get(this.options.requestData.url,{search: this.getUrlParams()}).map((res) => res.json());
  }

  getUrlParams(){
    let params: any = new URLSearchParams();
    let reqParams = Object.assign({},this.options.requestData.params);
    console.log(reqParams,this.inputValue, "reqParams");
    for(let param in reqParams){
      let value = reqParams[param];
      if(reqParams[param] == "$inputValue"){
        value =  this.inputValue;
      }
      if(value) params.set(param,value);
    }
    return params;
  }

  updateValue(event) {
    this.touchWidget();
    this.updateInputValue(event.target.value);
    event.stopPropagation();
    this.showDropDownBlock();
    this.setSelectListByRequest();
  }

  updateInputValue(value){ console.log(value, "updateInputValue")
    this.inputValue = value;
  }

  setClassWidget(){
    let widgetClasses = [];
    if(!this.formControl.valid && this.formControl.touched && this.formControl.errors) {
      widgetClasses.push("errorWidget");
    }
    if(this.options) {
      if(this.options.hasOwnProperty("fieldHtmlClass")){
        widgetClasses.push(this.options.fieldHtmlClass);
      }
    }
    return widgetClasses;
  }

  selectedItem(selectItem){
    this.wdgts.updateValue(this, selectItem.value);
  }

  showDropDownBlock(){
    this.showAutoComplete = true;
  }


  toggleDropDownMenu(event?) {
    this.touchWidget();
    (this.showAutoComplete) ? this.showAutoComplete = false : this.showAutoComplete = true;
    if(event){
      this.setSelectListByRequest();
      event.stopPropagation();
    }
  }

  getValueByControlValue(controlValue){
      for(let list of this.selectList){
        if(list.value == this.controlValue){
          this.updateInputValue(list.text);
          return list.text;
        }
      }
    //this.updateInputValue("");
    return controlValue;
  }

  documentClick(){
    this.showAutoComplete = false;
  }
}
