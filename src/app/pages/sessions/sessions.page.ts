import { WorkPlace } from './../../api/models/work-place';
import { KeycloakService } from './../../services/keycloak.service';
import { QueryResourceService } from 'src/app/api/services';
import { AddWorkplaceModalComponent } from './../../components/add-workplace-modal/add-workplace-modal.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/services/util';
import { WorkPlaceDTO, SessionInfoDTO, DoctorDTO } from 'src/app/api/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {

  // sessions: SessionInfoDTO[] = [];
  workplaces: WorkPlaceDTO[] = [];
  private workplaceBehaviour = new BehaviorSubject<WorkPlaceDTO[]>(this.workplaces);
  sessionsMap: Map<string, SessionInfoDTO[]> = new Map();
  isReady = false;
  private sessionsMapMap: Map<
    string,
    Map<string, SessionInfoDTO[]>
  > = new Map();
  private sessionsBehaviour = new BehaviorSubject<
    Map<string, Map<string, SessionInfoDTO[]>>
  >(this.sessionsMapMap);

  doctor: DoctorDTO;

  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;

  constructor(private util: Util,
              private queryResourceService: QueryResourceService,
              private keycloakService: KeycloakService,
              private modalController: ModalController) {
                this.customPickerOptions = {
                  buttons: [{
                    text: 'Save',
                    handler: () => console.log('Clicked Save!')
                  }, {
                    text: 'Log',
                    handler: () => {
                      console.log('Clicked Log. Do not Dismiss.');
                      return false;
                    }
                  }]
                };
               }

  ngOnInit() {
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails() {
    this.keycloakService.getCurrentUserDetails()
    .then(user => {
      this.getDocterbyIdpCode(user);
      this.getWorkplaces(user, 0);
    });
  }

  getDocterbyIdpCode(user: any) {
    return this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username).subscribe(doctor => {
      this.doctor = doctor;});
  }

  getWorkplaces(user: any , i) {
    this.queryResourceService.findWorkPlacesByDoctorIdpCodeUsingGET({
     doctorIdpCode: user.preferred_username,
     page: i
    }).subscribe(pwrkplcs => {
      this.isReady = true;
      pwrkplcs.content.forEach(w => {
        this.getSessions(user,0,w.id).subscribe(sespage => {
          this.sessionsMap.set(w.id.toString(),sespage.content);
          console.log(sespage.content);
          
        } )
        this.workplaces.push(w);

      });
    });
  }

  getSessions(user: any, i ,wkplcid) {
    return this.queryResourceService.findAllSesionInfoByDoctorsWorkPlaceUsingGET({
      doctorIdpCode: user.preferred_username,
      workPlaceId: wkplcid,
      page:i
  });
  }


  async addWorkplaceModal() {
    const modal = await this.modalController.create({
      component: AddWorkplaceModalComponent,
      // componentProps: { exclude: this.exclude , did: this.doctor.id}
    });
    modal.present();
  }


  navigateProfile() {
    this.util.navigateProfile();
  }
}
