import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { PaymentSettingsComponent } from 'src/app/components/payment-settings/payment-settings.component';
import { GeneralSettingsComponent } from 'src/app/components/general-settings/general-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  entryComponents: [GeneralSettingsComponent, PaymentSettingsComponent]
})
export class SettingsPageModule {}
