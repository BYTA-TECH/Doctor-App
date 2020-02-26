import { KeycloakService } from './../../services/keycloak.service';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';
import { DoctorDTO } from 'src/app/api/models';
import { Util } from 'src/app/services/util';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  doctor: DoctorDTO;
  private doctorBehaviour = new BehaviorSubject<DoctorDTO>(this.doctor);
  constructor(private util: Util,
              private queryResourceService: QueryResourceService,
              private keycloak: KeycloakService) { }

  ngOnInit() {
    this.getDoctor();
  }

  profilePage() {
    this.util.navigateProfile();
  }

  settingsPage() {
    this.util.navigateSettings();
  }

  getDoctor() {
    this.util.createLoader()
    .then(loading => {
      loading.present();
      this.keycloak.getCurrentUserDetails()
      .then((user: any) => {
        this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username)
        .subscribe(doctor => {
          this.doctor = doctor;
          loading.dismiss();
        },()=>{
          loading.dismiss();
        }) ;
      });
    });
  }


  notificationPage() {
    
  }
}
