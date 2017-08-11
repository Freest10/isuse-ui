import { Injectable } from '@angular/core';

@Injectable()
export class WidgetUIService {

  initWidget(ctx: any) { console.log(ctx, 'ctx');
    if(ctx.formControl.value != null) ctx.controlValue = ctx.formControl.value;
    if(ctx.options.disabled) ctx.formControl.disable();
    ctx.controlDisabled = ctx.formControl.disabled;
    ctx._id = Math.random();
    ctx.formControl.valueChanges.subscribe(v => ctx.controlValue = v);
    if(ctx.controlDisabled){
       ctx.formControl.registerOnDisabledChange(disabled => ctx.controlDisabled = disabled);
    }
  }

  enableWidget(ctx: any) {
    ctx.formControl.enable();
  }

  updateValue(ctx: any, value): void {
    value = this.getValueByType(ctx, value);
    ctx.controlValue = value;
    if (ctx.formControl) {
      ctx.formControl.setValue(value);
    }
  }

  getValueByType(ctx: any, value){
    if(value != null){
      if(ctx.options.type == "number" || ctx.options.valueType == "number"){
        if(typeof value != "number" && !isNaN(value)){
          if(typeof value == "boolean"){
            if(value){
              return 1;
            }else{
              return 0;
            }
          }
          return parseFloat(value);
        }else{
          return null;
        }
      }else if(ctx.options.type == "string" || ctx.options.valueType == "string"){
        if(typeof value != "string") {
          if(typeof value == "boolean"){
            if(value){
              return "1";
            }else{
              return "0";
            }
          }
          return String(value);
        }
      }
    }
    return value;
  }

  touchWidget(ctx: any){
    ctx.formControl.markAsTouched();
  }

  inArray(item: any|any[], array: any[], allIn: boolean = false): boolean {
    if (!(item instanceof Array && array instanceof Array)) { return false; }
    if (item instanceof Array) {
      for (let subItem of item) {
        if (array.indexOf(subItem) !== -1, allIn) { return !allIn; }
      }
      return allIn;
    } else {
      return array.indexOf(item) !== -1;
    }
  }
}
