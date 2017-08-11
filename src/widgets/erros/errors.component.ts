import {Component, Input }             from '@angular/core';

@Component({
  selector: 'erros-widget',
  template: `
    <ng-container *ngIf="ctx.formControl">
      <div *ngIf="!ctx.formControl.valid && touched"  [class]="(modal) ? 'wrap-alert-modal-widget' : 'wrap-alert-widget'">
          <div [hidden]="!ctx.formControl.errors?.required">
            <ng-container *ngIf="ctx.options?.validMessages?.required">
              {{ctx.options?.validMessages?.required}}
            </ng-container>
            <ng-container *ngIf="!ctx.options?.validMessages?.required">
              Заполните обязательное поле!
            </ng-container>
          </div>
          <div [hidden]="!ctx.formControl.errors?.minlength">
            <ng-container *ngIf="ctx.options?.validMessages?.minLength">
              {{ctx.options?.validMessages?.minLength}}
            </ng-container>
            <ng-container *ngIf="!ctx.options?.validMessages?.minLength">
              Минимальная количество символов - {{ctx.formControl.errors?.minlength?.requiredLength}}
            </ng-container>
          </div>
          <div [hidden]="!ctx.formControl.errors?.maxlength">
            <ng-container *ngIf="ctx.options?.validMessages?.maxLength">
              {{ctx.options?.validMessages?.maxLength}}
            </ng-container>
            <ng-container *ngIf="!ctx.options?.validMessages?.maxLength">
              Максимальное количество символов -  {{ctx.formControl.errors?.maxlength?.requiredLength}}
            </ng-container>
          </div>
        </div>
      </ng-container>
  `,
   styles: [`
     .wrap-alert-modal-widget,.wrap-alert-widget{color:#e04b41;font-size:12px}
     .wrap-alert-modal-widget{padding:10px 20px 20px 20px;}
     .wrap-alert-widget{position:absolute;bottom:-9px;white-space: nowrap;}
   `],
})
export class ErrorWidgetsComponent{
  @Input() ctx: any;
  @Input() touched: boolean;
  @Input() modal: boolean;

}
