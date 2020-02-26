import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
})
export class AddPrescriptionComponent implements OnInit {

  // prescription: PrescriptionRequest = {};
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss();
  }

  savePrescription() {
    // this.modalController.dismiss(this.prescription)
  }

}
