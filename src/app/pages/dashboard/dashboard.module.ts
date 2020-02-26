import { GeneralSettingsComponent } from 'src/app/components/general-settings/general-settings.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
  entryComponents: [HeaderComponent, GeneralSettingsComponent]
})
export class DashboardPageModule {}
