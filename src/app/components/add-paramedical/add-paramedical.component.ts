import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-paramedical',
  templateUrl: './add-paramedical.component.html',
  styleUrls: ['./add-paramedical.component.scss'],
})
export class AddParamedicalComponent implements OnInit {
  // paramedicalInfo: ParamedicalExaminationRequest = {};

  constructor(private modalController: ModalController,
               private platform: Platform) { }

ngOnInit() {}

ionViewDidEnter() {
  this.platform.backButton.subscribe(() => {
    // this does work
  });
}

saveParamedical() {
  // this.modalController.dismiss(this.paramedicalInfo);
}

dismiss() {
  this.modalController.dismiss();
}
}
