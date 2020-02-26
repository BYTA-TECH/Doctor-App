import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomDatePickerComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CustomDatePickerComponent implements ControlValueAccessor {
  editMode = false;
  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Other Component Data
  @Input() placeholder: string;
  @Input() labelName: string;
  @Input() defaultValue: string;

  @Output() saveEvent = new EventEmitter<any>();;

  constructor() { }


  save() {

    this.editMode = false;
    this.saveEvent.emit(this.value);
  }

  setFocus() {
    if(this.editMode === true) {
      this.save();
    } else {
      this.innerValue = this.defaultValue;
      this.editMode = true;
      document.getElementById('datePicker').click();
    }
  }

  close() {
    this.editMode = false;
  }

  // get accessor
  get value(): any {
      return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }
  // constructor() { }

  // ngOnInit() {}

}
