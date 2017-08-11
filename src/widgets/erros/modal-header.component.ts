import {Component}             from '@angular/core';
import {MdDialogRef, MdDialog}                from '@angular/material';
import { ErrorModalWidgetsComponent }         from './errors-modal.component';

@Component({
  selector: 'erros-modal-header-widget',
  template: `
    <div class="headerError">
      <h3>{{dialogRef.componentInstance.data.ctx.options?.validMessages?.headerModalError || 'Ошибка'}}</h3> 
      <div class="closeModalHeader" [style.background-image]="'url(' + closeButton + ')'" (click)="closeModal()"></div>
    </div>
  `,
   styles: [`
     .wrap-alert-widget{position:absolute;bottom:-4px;color:#e04b41;font-size:12px;}
     .closeModalHeader{float:right;width:14px;height:14px;cursor:pointer;}
     h3{float:left;}
     .headerError::after{content:'';clear:both;display: block;}
     .headerError{padding: 20px 20px 20px 20px;}
   `],
})
export class ErrorModalHeaderWidgetsComponent{
  closeButton = require('../../images/middle-close.png');

  constructor(public dialog: MdDialog,
              public dialogRef: MdDialogRef<ErrorModalWidgetsComponent>){

  }

  closeModal(){
    this.dialogRef.close();
  }

}
