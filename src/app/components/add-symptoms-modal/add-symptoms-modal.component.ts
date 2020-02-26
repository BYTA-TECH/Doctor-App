import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-symptoms-modal',
  templateUrl: './add-symptoms-modal.component.html',
  styleUrls: ['./add-symptoms-modal.component.scss'],
})
export class AddSymptomsModalComponent implements OnInit {
  // symptoms = SYMPTOMS;

  inputValueSymptoms;

  tmpOptionsSymptoms = [];

  selectedSymptoms = [];

  @ViewChild('searchInput', null) searchInput: IonInput;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  selectSymptoms(s) {
    this.selectedSymptoms.push(s);
    this.searchInput.setFocus();
    // this.tmpOptionsSymptoms = [];
    // this.inputValueSymptoms = '';
  }

  removeSymptoms(s) {
    this.selectedSymptoms = this.selectedSymptoms.filter(val => val !== s);
    this.searchInput.setFocus();
  }


  save() {
    this.modalController.dismiss(this.selectedSymptoms);
  }

  findMatching(type) {
    
    let tmpArray = [];

    this.tmpOptionsSymptoms = [];

    // tmpArray = this.symptoms;
    if (this.inputValueSymptoms.length != 0) {
      for (const option of tmpArray) {
        if (
          this.inputValueSymptoms
            .substr(0, this.inputValueSymptoms.length)
            .toUpperCase() ===
          option.name.substr(0, this.inputValueSymptoms.length).toUpperCase()
        ) {
          this.tmpOptionsSymptoms.push(option);
        }
      }
    }
  }

}
