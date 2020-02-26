import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import { ConsultationComponent } from 'src/app/components/consultation/consultation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AppointmentPageRoutingModule
  ],
  declarations: [AppointmentPage],
  entryComponents: [ConsultationComponent]
})
export class AppointmentPageModule {}
