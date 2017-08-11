import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { WidgetLibraryService }             from './widget-library.service';
import { WidgetUIService }                  from '../widget-ui.service';
import { BASIC_WIDGETS }                    from './default_widgets/index';
import { NgxMyDatePickerModule }            from 'ngx-mydatepicker';
import { NgxDatatableModule }               from '@swimlane/ngx-datatable';
import { ErrorWidgetsComponent }            from './erros/errors.component';
import { MdDialogModule }                   from '@angular/material';
//dimport { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { ErrorModalWidgetsComponent }       from './erros/errors-modal.component';
import { DetectChange }                     from '../directives/detectChanges';
import { ErrorModalHeaderWidgetsComponent }       from './erros/modal-header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  imports:         [ CommonModule, FormsModule, NgxDatatableModule, NgxMyDatePickerModule, MdDialogModule, NoopAnimationsModule ],
  declarations:    [ ...BASIC_WIDGETS, ErrorWidgetsComponent, ErrorModalWidgetsComponent, DetectChange, ErrorModalHeaderWidgetsComponent ],
  exports:         [ ...BASIC_WIDGETS ],
  entryComponents: [ ...BASIC_WIDGETS, ErrorWidgetsComponent, ErrorModalWidgetsComponent, ErrorModalHeaderWidgetsComponent ],
  providers:       [ WidgetUIService, WidgetLibraryService ]
})
export class WidgetLibraryModule { }
