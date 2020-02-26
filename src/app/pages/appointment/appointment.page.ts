import { Component, OnInit } from '@angular/core';
import { DoctorSettingsDTO } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import { ConsultationComponent } from 'src/app/components/consultation/consultation.component';
import { BehaviorSubject } from 'rxjs';
import { APPOINTMENTS } from 'src/app/mocks/appointments.list';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  pendingAppointments: any[] = [];

  completedAppointments: any[] = [];

  acceptedAppointments: any[] = [];

  currentPage = 'pending';

  settings: DoctorSettingsDTO = {
    approvalType: ''
  };

  private doctorSetting: DoctorSettingsDTO;
  private doctorSettingBehaviour = new BehaviorSubject<DoctorSettingsDTO>(this.doctorSetting);

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.getSettings();
  }

  getPendingAppointments() {
    this.pendingAppointments = APPOINTMENTS;
  }

  getAcceptedAppointments() {
    this.acceptedAppointments = APPOINTMENTS;
  }

  getCompletedAppointments() {

  }

  getSettings() {
    this.getDoctorSettings()
    .subscribe(ds => {
      if(ds != undefined) {
        this.settings = ds;
        console.log(ds);
        if(this.settings.approvalType === 'manual') {
          this.currentPage = 'pending';
          this.getPendingAppointments();
        } else {
          this.currentPage = 'accepted';
        }
      }
      this.getAcceptedAppointments();
      this.getCompletedAppointments();
    });
  }


  async startConsultation(pAppointment: any) {
    const modal = await this.modalController.create({
      component: ConsultationComponent,
      componentProps: {appointment: pAppointment}
    });

    modal.onDidDismiss()
    .then(data => {
      if (data.data !== undefined) {
        this.pendingAppointments = this.pendingAppointments.filter(val => val !==  data.data);
        this.completedAppointments.push(data.data);
      }
    });

    return await modal.present();
  }

  viewConsultationHistory(a) {

  }

  acceptAppointment(a) {

  }

  declineAppointment(a) {

  }

  segmentChanged(event) {
    this.currentPage = event.detail.value;
  }

  public getDoctorSettings() {
    return this.doctorSettingBehaviour;
  }
}
