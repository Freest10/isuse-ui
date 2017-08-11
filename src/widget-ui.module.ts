
import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule }                      from '@angular/forms';
import { WidgetUIComponent }                from './widget-ui.component';
import { WidgetUIService }                  from './widget-ui.service';
import { WidgetLibraryModule }              from './widgets/widget-library.module';
import { WidgetLibraryService }             from './widgets/widget-library.service';
import { HttpModule }                       from '@angular/http';

@NgModule({
  imports: [
    CommonModule, FormsModule, WidgetLibraryModule, HttpModule
  ],
  declarations: [ WidgetUIComponent ],
  exports: [ WidgetUIComponent, WidgetLibraryModule ],
  providers: [ WidgetUIService, WidgetLibraryService ]
})
export class WidgetUIModule { }
