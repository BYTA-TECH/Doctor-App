import { CalendarCardComponent } from './calendar-card/calendar-card.component';
import { PopoverComponent } from './popover/popover.component';
import { AddSymptomsModalComponent } from './add-symptoms-modal/add-symptoms-modal.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { AddParamedicalComponent } from './add-paramedical/add-paramedical.component';
import { AddMedicalSummaryComponent } from './add-medical-summary/add-medical-summary.component';
import { AddDiagnosisModalComponent } from './add-diagnosis-modal/add-diagnosis-modal.component';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { ConsultationComponent } from 'src/app/components/consultation/consultation.component';
import { RatingComponent } from './rating/rating.component';
import { CustomDatePickerComponent } from './custom-date-picker/custom-date-picker.component';
import { ProfileWorkplacesComponent } from './profile-workplaces/profile-workplaces.component';
import { AddQualificationModalComponent } from './add-qualification-modal/add-qualification-modal.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { FormsModule } from '@angular/forms';
import { AddWorkplaceModalComponent } from './add-workplace-modal/add-workplace-modal.component';
import { IonicModule } from '@ionic/angular';
import { AddSingleSessionModalComponent } from './add-single-session-modal/add-single-session-modal.component';
import { SessionComponent } from './session/session.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AddSessionModalComponent } from './add-session-modal/add-session-modal.component';
import { ProfileQualificationsComponent } from './profile-qualifications/profile-qualifications.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [HeaderComponent,
    SessionComponent,
    AddSessionModalComponent,
    AddSingleSessionModalComponent,
  AddWorkplaceModalComponent,
  AddQualificationModalComponent,
ProfileDetailsComponent,
ProfileQualificationsComponent,
ProfileWorkplacesComponent,
ImageSelectorComponent,
ConsultationComponent,
CustomInputComponent,
CustomDatePickerComponent,
GeneralSettingsComponent,
PaymentSettingsComponent,
RatingComponent,
AddDiagnosisModalComponent,
AddMedicalSummaryComponent,
AddParamedicalComponent,
AddPrescriptionComponent,
AddSymptomsModalComponent,
CalendarCardComponent,
PopoverComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    NgCalendarModule,
  ],
  exports: [HeaderComponent,
    SessionComponent,
    AddSessionModalComponent,
  AddWorkplaceModalComponent,
  AddQualificationModalComponent,
ProfileDetailsComponent,
CalendarCardComponent,
ProfileQualificationsComponent,
ProfileWorkplacesComponent,
CustomInputComponent,
CustomDatePickerComponent,
ImageSelectorComponent,
ConsultationComponent,
RatingComponent,
GeneralSettingsComponent,
PaymentSettingsComponent,
AddDiagnosisModalComponent,
AddMedicalSummaryComponent,
AddParamedicalComponent,
AddPrescriptionComponent,
AddSymptomsModalComponent,
PopoverComponent]
})
export class ComponentsModule { }
