import { Directive, Input} from '@angular/core';

@Directive({
    selector: '[touchWidget]'
})
export class DetectChange {
    @Input() touchWidget: any;
    @Input() widgetContext: any;
    @Input() onTouchFunc: any;

    ngOnChanges(changes) { console.log(changes,this.widgetContext.formControl, "touched");
      if(this.widgetContext.formControl.touched){
        setTimeout(()=>{
          this.widgetFuncOnTouch();
          this.widgetContext.formControl.markAsUntouched();
        }, 40)
      }
    }

    widgetFuncOnTouch(){
      if(typeof this.onTouchFunc == "function"){
        this.onTouchFunc.call(this.widgetContext);
      }
    }
}

