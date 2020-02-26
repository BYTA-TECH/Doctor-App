import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { DoctorSettingsDTO, DoctorDTO } from 'src/app/api/models';
import { Util } from 'src/app/services/util';
import { ModalController } from '@ionic/angular';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {

  loader: HTMLIonLoadingElement;
  static _DOCTOR_KEY = 'doctor';
  static _DOCTOR_SETTINGS_KEY = 'setting';
  doctorSettings: DoctorSettingsDTO = {};
  private doctorSetting: DoctorSettingsDTO;
  private doctorSettingBehaviour = new BehaviorSubject<DoctorSettingsDTO>(this.doctorSetting);

  constructor(private modalController: ModalController,
              private util: Util,
              private commandResourceService: CommandResourceService,
              private storage: Storage,
              private queryResourceService: QueryResourceService,
              private keycloak: KeycloakService) { }

  ngOnInit() {
    this.getDoctorSettings();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  updateSettngs() {
    this.util.createLoader()
    .then(loader => {
      this.loader = loader;
      loader.present();
      this.updateDoctorSettings(this.doctorSettings , ()=>{
        loader.dismiss();
      });
    });
  }

  public updateDoctorSettings(doctorSettings: DoctorSettingsDTO , success) {
    // this.doctorService.updateDoctorSetting(doctorSettings)
    this.commandResourceService.updateDoctorSettingUsingPUT(doctorSettings)
    .subscribe(result=> {
      success();
      console.log('sucess');
      
      // this.initDoctorSettings(true);
    },
    err=>{
      this.loader.dismiss();
    });
  }

  // public initDoctorSettings(fromRestAPI?: boolean) {
  //   const func = (uid: any) => {
  //     this.queryResourceService.findDoctorSettingsUsingGET(uid)
  //     .subscribe(doctorSettings => {
  //       this.doctorSettingBehaviour.next(doctorSettings);
  //       this.storage.set(GeneralSettingsComponent._DOCTOR_SETTINGS_KEY , doctorSettings);
  //     });
  //   };

  //   if (fromRestAPI !== undefined && fromRestAPI === true) {
  //     this.storage.get(GeneralSettingsComponent._DOCTOR_KEY).then((data:DoctorDTO) => {
  //       console.log('getting Settings for ' , data);
  //       func(data.doctorSettingsId);
  //     });
  //   } else {
  //     this.storage.get(GeneralSettingsComponent._DOCTOR_SETTINGS_KEY).then(data => {
  //       if (data == null) {
  //         this.storage.get(GeneralSettingsComponent._DOCTOR_KEY).then(doc => {
  //           console.log('getting Settings for ' , doc);
  //           func(doc.doctorSettingsId);
  //         });
  //       } else {
  //         this.doctorSettingBehaviour.next(data);
  //       }
  //     });
  //   }
  // }
  getDoctorSettings() {
    this.util.createLoader()
    .then(loader => {
      loader.present();

      // this.doctorSettingBehaviour
      this.keycloak.getCurrentUserDetails().then((user: any) => {
        this.queryResourceService
          .findDoctorSettingsUsingGET(user.preferred_username)
      .subscribe(ds => {
        this.doctorSettings = ds;
        loader.dismiss();
      },
      err=>{
        loader.dismiss();
      });  
    });
  });
  }
}
