import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

import { WidgetUIService } from '../../../widget-ui.service';

@Component({
  selector: 'drop-down-menu-widget',
  template: `
    <div [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'">
      <div class="dropDownMenu" (document:click)="documentClick()" >
        <div [ngClass]="setClassTitle()" (click)="toggleDropDownMenu($event)" [innerHTML]="options?.title"></div>
          <ul *ngIf="showDropDown && !controlDisabled && selectList" class="dropDownList">
            <li *ngFor="let selectItem of selectList" 
                [ngClass]="setActiveClass(selectItem)" 
                (click)="setActiveItem(selectItem)">
              {{selectItem.text}}
            </li>
          </ul>
        <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
      </div>
    </div>
    `,
  styleUrls: ["./drop-down-menu.component.css"]
})
export class DropDownMenuComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  valueType: string;
  controlName: string;
  selectList: any[] = [];
  showDropDown: boolean = false;
  _id: any;

  constructor(private wdgts: WidgetUIService) {}

  ngOnInit() {
    if (this.options) {
      if (this.options.hasOwnProperty("data")) {
        this.selectList = this.options["data"];
      } else {
        console.error("Select component has not data!");
      }
    }
    this.wdgts.initWidget(this);
  }

  documentClick(){
    this.showDropDown = false;
  }

  setClassTitle() {
    let titleClasses = ["dropDownTitle"];
    if(this.showDropDown){
      titleClasses.push("expanded")
    }
    return titleClasses;
  }

  toggleDropDownMenu(event?) {
    this.touchWidget();
    (this.showDropDown) ? this.showDropDown = false : this.showDropDown = true;
    if(event) event.stopPropagation();
  }

  touchWidget() {
    if (!this.formControl.touched) {
      this.wdgts.touchWidget(this);
    }
  }

  setActiveClass(item) {
    if(item.value == this.controlValue){
      return "active";
    }
  }

  setActiveItem(item){
    this.wdgts.updateValue(this, item.value);
    this.toggleDropDownMenu();
  }
}
