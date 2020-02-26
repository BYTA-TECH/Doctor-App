import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { Storage } from '@ionic/storage';
import { KeycloakService } from './../../services/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { DoctorDTO, DoctorSettingsDTO, PaymentSettingsDTO } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ImageSelectorComponent } from '../image-selector/image-selector.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {

  static _DOCTOR_KEY = 'doctor';
  static _DOCTOR_SETTINGS_KEY = 'setting';
  static _PAYMENT_SETTINGS_KEY = 'payment';
  static _QUALIFICATIONS_KEY = 'qualifications';
  static _WORKPLACES_KEY = 'workplaces';
  static _SESSIONS_KEY = 'sessions';
  inputSupportedDate: string;

  doctor: DoctorDTO;
  private doctorBehaviour = new BehaviorSubject<DoctorDTO>(this.doctor);

  private doctorSetting: DoctorSettingsDTO;
  private doctorSettingBehaviour = new BehaviorSubject<DoctorSettingsDTO>(this.doctorSetting);

  private paymentSettings: PaymentSettingsDTO;
  private paymentSettingsBehaviour = new BehaviorSubject<PaymentSettingsDTO>(this.paymentSettings);


  constructor(private modalController: ModalController,
              private keycloakService: KeycloakService,
              private storage: Storage,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService) { }

  ngOnInit() {
    this.getCurrentUserDetails();
  }
  // tslint:disable-next-line: align
  getDoctor(user) {
    this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username).subscribe(doctor => {
      this.doctor = doctor;
      if (doctor) {
        const date = new Date(this.doctor.practiceSince);
        this.inputSupportedDate = moment(date).format('YYYY-MM-DD');
      }
    });
  }
  // public getDoctors() {
  //   return this.doctorBehaviour;
  // }

  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
    .then(data => {
      this.doctor.imageLink = data.data.imageBase64;
      this.doctor.imageContentType = data.data.imageType;
      this.updateDoctor(this.doctor);
    });

    modal.present();
  }

   async updateDoctor(doctor: DoctorDTO) {
    return await this.keycloakService.getCurrentUserDetails()
    .then((user: any) => {
      user.name = this.doctor.firstName;
      user.email = this.doctor.email;
      return this.keycloakService.updateCurrentUserDetails(user)
      .then(data => {
    return this.commandResourceService.updateDoctorUsingPUT(this.doctor).subscribe();

        // return this.updateDoctors(doctor)
        // .subscribe(doctorResult => {
        //   this.initDoctor(true);
        // });
      });
    });
  }

  // updateDoctors(doctor: DoctorDTO) {
  //   return this.commandResourceService.updateDoctorUsingPUT(doctor);
  // }

 
  getCurrentUserDetails(){
    this.keycloakService.getCurrentUserDetails()
    .then(user=>{
      this.getDoctor(user);
      this.getDoctorSettings(user);
      this.getPaymentSettings(user);
    }) 
  }

  getDocterByIdpCode(user: any){
    return this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username).subscribe(doctor => {
      this.doctor = doctor});
  }
  getDoctorSettings(user: any) {
    return this.queryResourceService.findDoctorSettingsUsingGET(user.preferred_username);
  }

 
  getPaymentSettings(user: any) {
    return this.queryResourceService.findPaymentSettingsByDoctorIdpCodeUsingGET(user.preferred_username);
  }
}

