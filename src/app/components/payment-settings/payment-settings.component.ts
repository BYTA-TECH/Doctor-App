import { KeycloakService } from './../../services/keycloak.service';
import { Storage } from '@ionic/storage';
import {
  CommandResourceService,
  QueryResourceService
} from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { PaymentSettingsDTO, DoctorDTO } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import { Util } from 'src/app/services/util';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss']
})
export class PaymentSettingsComponent implements OnInit {
  static _DOCTOR_KEY = 'doctor';
  static _PAYMENT_SETTINGS_KEY = 'payment';
  loader: HTMLIonLoadingElement;
  paymentSettings: PaymentSettingsDTO = {
    currency: '',
    amount: 0
  };
  doctor: DoctorDTO;
  private paymentSettingsBehaviour = new BehaviorSubject<PaymentSettingsDTO>(
    this.paymentSettings
  );
  constructor(
    private modalController: ModalController,
    private util: Util,
    private commandResourceService: CommandResourceService,
    private queryResourceService: QueryResourceService,
    private storage: Storage,
    private keycloak: KeycloakService
  ) {}

  ngOnInit() {
    this.getPaymentSettings();
  }
  dismiss() {
    this.modalController.dismiss();
  }

  updateSettings() {
    this.util.createLoader().then(loader => {
      this.loader = loader;
      loader.present();
      this.updatePaymentSettings(this.paymentSettings, () => {
        loader.dismiss();
      });
    });
  }
  public updatePaymentSettings(paymentSettings: PaymentSettingsDTO, success) {
    this.commandResourceService
      .updatePaymentSettingUsingPUT(paymentSettings)
      .subscribe(
        result => {
          success();
          // this.initPaymentSettings(true);
        },
        err => {
          this.loader.dismiss();
        }
      );
  }

  getDocterByIdpCode(user: any) {
    return this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username).subscribe(doctor => {
      this.doctor = doctor; });

  }

  // this is the original method.........................................................

  // getPaymentSettings() {
  //   this.util.createLoader().then(loader => {
  //     loader.present();

  //     // this.getPaymentSetting()
  //     this.keycloak.getCurrentUserDetails().then((user: any) => {
  //       this.getDocterByIdpCode(user);
  //       this.queryResourceService
  //         .findPaymentSettingsByDoctorIdpCodeUsingGET(user.preferred_username)
  //         .subscribe(
  //           ps => {
  //             console.log(this.doctor);
  //             console.log('-----------', ps);
  //             this.paymentSettings = ps;
  //             loader.dismiss();
  //           },
  //           () => {
  //             loader.dismiss();
  //           }
  //         );
  //     });
  //   });
  // }

  public getPaymentSetting() {
    return this.paymentSettingsBehaviour;
  }

  getPaymentSettings() {
    this.util.createLoader()
    .then(loader => {
      loader.present();
      // creation not required.............this is duplicate method
      this.commandResourceService.createPaymentSettingUsingPOST(this.paymentSettings)
      // this.getPaymentSetting()
      .subscribe(ps => {
        console.log('-----------', ps);
        this.paymentSettings = ps;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
      });
    });
  }
}

// tslint:disable-next-line: align

// public initPaymentSettings(fromRestAPI ? : boolean) {
//   const func = (uid: any) => {
//     this.queryResourceService.findPaymentSettingsUsingGET(uid)
//     .subscribe(paymentSettings => {
//       this.paymentSettingsBehaviour.next(paymentSettings);
//       this.storage.set(PaymentSettingsComponent._PAYMENT_SETTINGS_KEY , paymentSettings);
//     });
//   };

//   if(fromRestAPI !== undefined && fromRestAPI === true); {
//     this.storage.get(PaymentSettingsComponent._DOCTOR_KEY).then((data: DoctorDTO) => {
//       console.log('getting Payment Settings for ' , data);
//       func(data.paymentSettingsId);
//     });
//   } else {
//     this.storage.get(PaymentSettingsComponent._PAYMENT_SETTINGS_KEY).then(data => {
//       if (data == null) {
//         this.storage.get(PaymentSettingsComponent._DOCTOR_KEY).then(doc => {
//           console.log('getting payment Settings for ' , doc);
//           func(doc.paymentSettingsId);
//         });
//       } else {
//         this.paymentSettingsBehaviour.next(data);
//       }
//     });
//   }
// }
