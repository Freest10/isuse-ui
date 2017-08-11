import { Component, Input, OnInit }                 from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import {MdDialog, MdDialogRef}                      from '@angular/material';
import { WidgetUIService }                          from '../../../widget-ui.service';
import { ErrorModalWidgetsComponent }               from '../../erros/errors-modal.component';

@Component({
  selector: 'table-widget',
  template: `
    <div 
      [class]="(options?.htmlClass) ? options?.htmlClass : 'wrap-widget'" 
      [touchWidget]="formControl.touched"
      [widgetContext]="this"
      [onTouchFunc]="touchWidget"
    >
      <h3 *ngIf="options?.title">{{options?.title}}</h3>
      <ngx-datatable 
        [style.height]="options?.height"
        [style.width]="options?.width"
        [rows]="rowsData"
        [columns]="options?.columns"
        [messages]="messages"
        [footerHeight]="40"
        [limit]="options?.limit"
        [loadingIndicator]="true"
        [scrollbarV]="true"
        [selected]="selected"
        [selectionType]="options?.selectionType"
        (activate)="onActivate($event)"
        (select)='onSelect($event)'
      >
      </ngx-datatable>      
    </div>
    `,
     styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  controlName: string;
  _id: any;
  rowsData: any;
  messages: Object = {
    emptyMessage: 'В таблице отсутствуют данные',
    totalMessage: 'всего'
  }
  selected = [];
  dialogRef: MdDialogRef<ErrorModalWidgetsComponent>;

  constructor(private wdgts: WidgetUIService, public dialog: MdDialog){}

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    if(this.selected.length > 0){
      let [...selectedRows] = this.selected;
      this.wdgts.updateValue(this, selectedRows);
    }else{
      this.wdgts.updateValue(this, null);
    }
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  touchWidget(){
    if(this.formControl.errors){
      this.dialogRef = this.dialog.open(ErrorModalWidgetsComponent);
      this.dialogRef.componentInstance.data = {
        ctx: this
      }
    }
  }

  ngOnInit() {
    this.wdgts.initWidget(this);
    if (this.options.rows) this.rowsData = this.options.rows;
  }

}
