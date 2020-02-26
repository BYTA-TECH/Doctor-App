import { AddWorkplaceModalComponent } from 'src/app/components/add-workplace-modal/add-workplace-modal.component';
import { ProfileWorkplacesComponent } from './../../components/profile-workplaces/profile-workplaces.component';
import { ProfileQualificationsComponent } from './../../components/profile-qualifications/profile-qualifications.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileDetailsComponent } from 'src/app/components/profile-details/profile-details.component';
import { AddQualificationModalComponent } from 'src/app/components/add-qualification-modal/add-qualification-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage],
  entryComponents: [ProfileDetailsComponent,
    ProfileQualificationsComponent, 
    ProfileWorkplacesComponent,
    AddQualificationModalComponent,
    AddWorkplaceModalComponent]
})
export class ProfilePageModule {}
