import { Storage } from '@ionic/storage';
import { KeycloakService } from './../../services/keycloak.service';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/services/util';
import { DoctorDTO, QualificationDTO, WorkPlaceDTO, DoctorSettingsDTO, PaymentSettingsDTO } from 'src/app/api/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  static _DOCTOR_KEY = 'doctor';
  static _QUALIFICATIONS_KEY = 'qualifications';
  static _WORKPLACES_KEY = 'workplaces';
  static _DOCTOR_SETTINGS_KEY = 'setting';
  static _PAYMENT_SETTINGS_KEY = 'payment';

  private doctor: DoctorDTO;
  private doctorBehaviour = new BehaviorSubject<DoctorDTO>(this.doctor);

  private qualifications: QualificationDTO[] = [];
  private qualifcationBehaviour = new BehaviorSubject<QualificationDTO[]>(
    this.qualifications
  );

  private workplaces: WorkPlaceDTO[] = [];
  private workplaceBehaviour = new BehaviorSubject<WorkPlaceDTO[]>(this.workplaces);

  private doctorSetting: DoctorSettingsDTO;
  private doctorSettingBehaviour = new BehaviorSubject<DoctorSettingsDTO>(this.doctorSetting);

  private paymentSettings: PaymentSettingsDTO;
  private paymentSettingsBehaviour = new BehaviorSubject<PaymentSettingsDTO>(this.paymentSettings);

  static resetflag = false;
  options = [
    {name: 'Sessions', icon: 'clock', route: 'session'},
    {name: 'Appointments', icon: 'calendar', route: 'appointment'}
  ];

  constructor(private util: Util,
              private queryResourceService: QueryResourceService,
              private keycloakService: KeycloakService,
              private storage: Storage) {
    if (this.getResetFlag() === true) {
      this.dataInitialize();
    }
   }
   public getResetFlag() {
    return DashboardPage.resetflag;
  }

  // Setters

  public setResetFlag(flag: boolean) {
    DashboardPage.resetflag = flag;
  }

  // Clear All Observables on logout
  // Sets the reset flag
  public clear() {
    DashboardPage.resetflag = true;
  }

  ngOnInit() {
  }
  navigateUrl(routeName) {

    switch (routeName) {
      case 'session':
          this.util.navigateSessions();
          break;

      case 'appointment':
        this.util.navigateAppointments();
    }
  }
  dataInitialize() {
    this.initDoctor(true);
    // this.initQualifications(true);
    // this.initWorkplaces(true);
    this.setResetFlag(false);
}
public initDoctor(fromRestAPI?: boolean) {
  const func = (user: any) => {
    this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username)
    .subscribe(
      doctor => {
        // Setting is Retrived Using Doctor id , not with keycloak username
        // this.initDoctorSettings();
        // this.initPaymentSettings();
        this.doctorBehaviour.next(doctor);
        this.storage.set(DashboardPage._DOCTOR_KEY, doctor);
      },
      err => {
        // Forward to Error Page
      }
    );
  };

  if (fromRestAPI !== undefined && fromRestAPI === true) {
    this.keycloakService.getCurrentUserDetails().then(func);
  } else {
    this.storage.get(DashboardPage._DOCTOR_KEY).then(data => {
      if (data == null) {
        this.keycloakService.getCurrentUserDetails().then(func);
      } else {
        // Setting is Retrived Using Doctor id , not with keycloak username
        // this.initDoctorSettings();
        // this.initPaymentSettings();
        this.doctorBehaviour.next(data);
      }
    });
  }
}
// public initQualifications(fromRestAPI?: boolean) {
//   const func = (user: any) => {
//     this.getDoctorQualifications(user.preferred_username)
//       .subscribe(qualifications => {
//         this.qualifcationBehaviour.next(qualifications);
//         this.storage.set(DashboardPage._QUALIFICATIONS_KEY, qualifications);
//       });
//   };

//   if (fromRestAPI !== undefined && fromRestAPI === true) {
//     this.keycloakService.getCurrentUserDetails().then(func);
//   } else {
//     this.storage.get(DashboardPage._QUALIFICATIONS_KEY).then(data => {
//       if (data == null) {
//         this.keycloakService.getCurrentUserDetails().then(func);
//       } else {
//         this.qualifcationBehaviour.next(data);
//       }
//     });
//   }
// }
// public initWorkplaces(fromRestAPI?: boolean) {
//   const func = (user: any) => {
//     this.getDoctorWorkplaces(user.preferred_username)
//       .subscribe(workplaces => {
//         this.workplaceBehaviour.next(workplaces.content);
//         this.storage.set(DashboardPage._WORKPLACES_KEY, workplaces);
//       });
//   };

//   if (fromRestAPI !== undefined && fromRestAPI === true) {
//     this.keycloakService.getCurrentUserDetails().then(func);
//   } else {
//     this.storage.get(DashboardPage._WORKPLACES_KEY).then(data => {
//       if (data === null) {
//         this.keycloakService.getCurrentUserDetails().then(func);
//       } else {
//         this.workplaceBehaviour.next(data);
//       }
//     });
//   }
// }
// public initDoctorSettings(fromRestAPI?: boolean) {
//   const func = (uid: any) => {
//     this.getDoctorSettings(uid)
//     .subscribe(doctorSettings => {
//       this.doctorSettingBehaviour.next(doctorSettings);
//       this.storage.set(DashboardPage._DOCTOR_SETTINGS_KEY , doctorSettings);
//     });
//   };

//   if (fromRestAPI !== undefined && fromRestAPI === true) {
//     this.storage.get(DashboardPage._DOCTOR_KEY).then((data:DoctorDTO) => {
//       console.log('getting Settings for ' , data);
//       func(data.doctorSettingsId);
//     });
//   } else {
//     this.storage.get(DashboardPage._DOCTOR_SETTINGS_KEY).then(data => {
//       if (data == null) {
//         this.storage.get(DashboardPage._DOCTOR_KEY).then(doc => {
//           console.log('getting Settings for ' , doc);
//           func(doc.doctorSettingsId);
//         });
//       } else {
//         this.doctorSettingBehaviour.next(data);
//       }
//     });
//   }
// }

// public initPaymentSettings(fromRestAPI?: boolean) {
//   const func = (uid: any) => {
//     this.getPaymentSettings(uid)
//     .subscribe(paymentSettings => {
//       this.paymentSettingsBehaviour.next(paymentSettings);
//       this.storage.set(DashboardPage._PAYMENT_SETTINGS_KEY , paymentSettings);
//     });
//   };

//   if (fromRestAPI !== undefined && fromRestAPI === true) {
//     this.storage.get(DashboardPage._DOCTOR_KEY).then((data: DoctorDTO) => {
//       console.log('getting Payment Settings for ' , data);
//       func(data.paymentSettingsId);
//     });
//   } else {
//     this.storage.get(DashboardPage._PAYMENT_SETTINGS_KEY).then(data => {
//       if (data == null) {
//         this.storage.get(DashboardPage._DOCTOR_KEY).then(doc => {
//           console.log('getting payment Settings for ' , doc);
//           func(doc.paymentSettingsId);
//         });
//       } else {
//         this.paymentSettingsBehaviour.next(data);
//       }
//     });
//   }
// }
getDoctorQualifications(username: string) {
  return this.queryResourceService.findAllQualificationByDoctorIdpCodeUsingGET({
    doctorIdpCode: username
  });
}
getDoctorWorkplaces(username: string) {
  return this.queryResourceService.findWorkPlacesByDoctorIdpCodeUsingGET({
    doctorIdpCode: username
  });
}
getCurrentUserDetails(){
  this.keycloakService.getCurrentUserDetails()
  .then(user=>{
    this.getDoctorSettings(user);
    this.getPaymentSettings(user);
  }) 
}

getDoctorSettings(user: any) {
  return this.queryResourceService.findDoctorSettingsUsingGET(user.preferred_username);
}

getPaymentSettings(user: any) {
  return this.queryResourceService.findPaymentSettingsByDoctorIdpCodeUsingGET(user.preferred_username);
}
}
