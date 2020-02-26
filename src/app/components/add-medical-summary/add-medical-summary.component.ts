import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddSymptomsModalComponent } from '../add-symptoms-modal/add-symptoms-modal.component';
import { AddDiagnosisModalComponent } from '../add-diagnosis-modal/add-diagnosis-modal.component';

@Component({
  selector: 'app-add-medical-summary',
  templateUrl: './add-medical-summary.component.html',
  styleUrls: ['./add-medical-summary.component.scss'],
})
export class AddMedicalSummaryComponent implements OnInit {
  selectedDiagnosis = [];

  selectedSymptoms = [];

  // consultationInfo: ConsultationRequest = {};
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  saveMedicalSummary() {
    const date = new Date();
    // this.consultationInfo.evaluation = this.selectedDiagnosis;
    // this.consultationInfo.symptom = this.selectedSymptoms;
    // this.consultationInfo.examinationRequired = 'no';
    // this.consultationInfo.date =
    //   date.getMonth() +
    //   '-' +
    //   date.getUTCDay() +
    //   '-' +
    //   date.getFullYear() +
    //   ' ' +
    //   date.getHours() +
    //   ':' +
    //   date.getMinutes();
    // this.modalController.dismiss(this.consultationInfo);
  }

  removeDiagnosis(d) {
    this.selectedDiagnosis = this.selectedDiagnosis.filter(val=>val != d);
  }
  removeSymptoms(s) {
    this.selectedSymptoms = this.selectedSymptoms.filter(val=>val != s);
  }

  async addDiagnosisModal() {
    const modal = await this.modalController.create({
      component: AddDiagnosisModalComponent
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data !== undefined) {
        data.data.forEach(element => {
          if (!this.selectedDiagnosis.includes(element)) {
            this.selectedDiagnosis.push(element);
          }
        });
      }
    });

    modal.present();
  }

  async addSymptomsModal() {
    const modal = await this.modalController.create({
      component: AddSymptomsModalComponent
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data !== undefined) {
        data.data.forEach(element => {
          if (!this.selectedSymptoms.includes(element)) {
            this.selectedSymptoms.push(element);
          }
        });
      }
    });

    modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
