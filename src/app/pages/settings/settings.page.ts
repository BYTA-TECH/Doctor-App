import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralSettingsComponent } from 'src/app/components/general-settings/general-settings.component';
import { PaymentSettingsComponent } from 'src/app/components/payment-settings/payment-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  
  async generalSetting() {
    const modal = await this.modalController.create({
      component: GeneralSettingsComponent
    });
    modal.present();
  }

  async paymentSetting() {
    const modal = await this.modalController.create({
      component: PaymentSettingsComponent
    });
    modal.present();
  }
}
