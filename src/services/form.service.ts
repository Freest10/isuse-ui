import { Injectable } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';


@Injectable()
export class FormsService {
  //formControlWidgetTypes: String[] = ["string", "number", "checkbox", "select", "radio", "dropDownMenu"];

  renderFormGroup(formOptions): FormGroup {
    let formGroupParams = {};
    for(let formOptionName in formOptions){
      //if(this.formControlWidgetTypes.indexOf(formOptions[formOptionName].type) > -1){ console.log(formOptionName, "formControlWidgetTypes");
        let widgetValue = formOptions[formOptionName].value || null;
        formGroupParams[formOptionName] = new FormControl(widgetValue, this.getValidatorsArrayByOptions(formOptions[formOptionName]));
        formOptions[formOptionName]._formControl = formGroupParams[formOptionName];
     // }
    }
    let formGroup: FormGroup = new FormGroup(formGroupParams);
    return formGroup;
  }

  getValidatorsArrayByOptions(options){
    let validArr = [];
    if (options.required){
      validArr.push(Validators.required);
    }
    if (typeof options.minLength == "number"){
      validArr.push(Validators.minLength(options.minLength));
    }
    if (typeof options.maxLength == "number"){
      validArr.push(Validators.maxLength(options.maxLength));
    }
    if (options.pattern){
      validArr.push(Validators.pattern(options.pattern));
    }
    return validArr;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      //control.updateValueAndValidity();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  notNullValue(values){
    let objectValues = {};
    this.iterrateToNotNull(values, objectValues);
    return objectValues;
  }

  iterrateToNotNull(values, objectValues){
    for(let value in values){
      let currentValue = values[value];
      if(currentValue != null){
        objectValues[value] = currentValue;
      }else if(currentValue instanceof Array){
       this.iterrateToNotNull(currentValue, objectValues);
      }
    }
  }

}
