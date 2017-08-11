import {Component, Input}             from '@angular/core';
import {MdDialogRef, MdDialog}                  from '@angular/material';

@Component({
  selector: 'erros-modal-widget',
  template: `
    <ng-container *ngIf="data.ctx">
      <erros-modal-header-widget></erros-modal-header-widget>
      <erros-widget [ctx]="data.ctx" [touched]="true" [modal]="true"></erros-widget>
    </ng-container>
  `,
   styles: ['.wrap-alert-widget{position:absolute;bottom:-4px;color:#e04b41;font-size:12px;padding: 10px 20px 20px 20px;}'],
})
export class ErrorModalWidgetsComponent{
  @Input() data;


  constructor(public dialog: MdDialog,
              public dialogRef: MdDialogRef<ErrorModalWidgetsComponent>){

  }

}
