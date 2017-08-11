import { Component, OnInit }  from '@angular/core';
import { AbstractControl }    from '@angular/forms';
import { WidgetUIService }    from '../../../widget-ui.service';

@Component({
  selector: 'datepicker-widget',
  template: `
    <div class="dateBlock wrap-widget">
      <div class="widgetBlock">
        <label *ngIf="options?.title"
               [attr.for]="'control' + _id"
               [class]="options?.labelHtmlClass"
               [style.display]="options?.notitle ? 'none' : ''"
               [innerHTML]="options?.title"></label>
        <input class="form-control" [placeholder]="(datePickerOptions?.placeholder) ? datePickerOptions?.placeholder : ''" ngx-mydatepicker name="mydate"
               [options]="datePickerOptions"  #dp="ngx-mydatepicker"
               [id]="'control' + _id"
               (dateChanged)="onDateChanged1($event)"
               [value]="controlValue"
               (input)="updateValue($event)"
        />
         <div class="input-group-btn">
              <button 
                type="button" 
                (click)="dp.clearDate()"
                class="closeCalendar"
                [style.background-image]="'url(' + closeButton + ')'"              
              >
              </button>
              <button 
                type="button" 
                (click)="dp.toggleCalendar()"
                class="showCalendar"
                [style.background-image]="'url(' + imageArrow + ')'"
              >
              </button>
          </div>
        </div>
    </div>
    <erros-widget [ctx]="this" [touched]="formControl.touched"></erros-widget>
    `,
     styleUrls: ["./datepicker.component.css"]
})
export class DatePickerComponent implements OnInit {
  formControl: AbstractControl;
  controlValue: any = "";
  controlDisabled: boolean = false;
  options: any;
  controlName: string;
  imageArrow = require('../../../images/right-arr.gif');
  closeButton = require('../../../images/close.png');
  _id: any;
  datePickerOptions: Object;
  defaultOptions = {
    todayBtnTxt: 'Сегодня',
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    disableUntil: {year: 0, month: 0, day: 0},
    dayLabels: {su: 'Суб', mo: 'Пн', tu: 'Вт', we: 'Ср', th: 'Чт', fr: 'Пт', sa: 'Вс'},
    monthLabels: {
      1: 'Янв',
      2: 'Фев',
      3: 'Март',
      4: 'Апр',
      5: 'Май',
      6: 'Июнь',
      7: 'Июль',
      8: 'Авг',
      9: 'Сен',
      10: 'Окт',
      11: 'Нояб',
      12: 'Дек'
    }
  };

  constructor(private wdgts: WidgetUIService) { }

  onDateChanged1(event) {
    this.wdgts.updateValue(this, event.formatted);
  }

  ngOnInit() {
    this.datePickerOptions = Object.assign({}, this.defaultOptions, this.options.datePickerOptions);
    this.wdgts.initWidget(this);
  }

  updateValue(event) {
    this.touchWidget();
  }

  touchWidget() {
    if (!this.formControl.touched) {
      this.wdgts.touchWidget(this);
    }
  }

}
