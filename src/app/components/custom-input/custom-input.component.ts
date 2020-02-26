import { Component, OnInit, Input, EventEmitter, Output, ViewChild, forwardRef } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputComponent),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CustomInputComponent implements ControlValueAccessor {
  editMode = false;
  // The internal data model
  private innerValue: any = '';

  private oldValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Other Component Data
  @Input() placeholder: string;
  @Input() labelName: string;
  @Input() defaultValue: string;

  @Output() saveEvent = new EventEmitter<any>();

  @ViewChild('customInput', null) customInput: IonInput;

  save() {

    this.editMode = false;
    this.saveEvent.emit(this.value);
  }

  setFocus() {
    if(this.editMode === true) {
      this.editMode = false;
      this.save();
    } else {
      this.oldValue = this.defaultValue;
      this.editMode = true;
      this.customInput.setFocus();
    }
  }

  close() {
    this.value= this.oldValue;
    this.editMode = false;
  }

  constructor() { }
  // ngOnInit() {}

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
}
