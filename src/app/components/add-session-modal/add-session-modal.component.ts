import { DoctorSessionInfoDTO } from './../../api/models/doctor-session-info-dto';
import { Storage } from '@ionic/storage';
import { KeycloakService } from './../../services/keycloak.service';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { WorkPlaceDTO, SessionInfoDTO } from 'src/app/api/models';
import { BehaviorSubject } from 'rxjs';
import { AddSingleSessionModalComponent } from '../add-single-session-modal/add-single-session-modal.component';

@Component({
  selector: 'app-add-session-modal',
  templateUrl: './add-session-modal.component.html',
  styleUrls: ['./add-session-modal.component.scss'],
})
export class AddSessionModalComponent implements OnInit {

  static _SESSIONS_KEY = 'sessions';
  static _WORKPLACES_KEY = 'workplaces';

  constructor(private modalController: ModalController,
              private queryResourceService: QueryResourceService,
              private commandResourceService: CommandResourceService,
              private keycloakService: KeycloakService,
              private storage: Storage) { }
  

  workplace: WorkPlaceDTO;
  arraySession: DoctorSessionInfoDTO[] = [];
  dayNumber;
  // monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  // 'July', 'August', 'September', 'October', 'November', 'December'
  // ];

  // availabelMonths: string[] = [];
  // mnthList: number[] = [];
  private workplaces: WorkPlaceDTO[] = [];
  private pageSession = 0;
  private sessionsMapMap: Map<
    string,
    Map<string, SessionInfoDTO[]>
  > = new Map();
  private sessionsBehaviour = new BehaviorSubject<
    Map<string, Map<string, SessionInfoDTO[]>>
  >(this.sessionsMapMap);
  private workplaceBehaviour = new BehaviorSubject<WorkPlaceDTO[]>(this.workplaces);

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  async addSession() {

    const modal = await this.modalController.create({
      component: AddSingleSessionModalComponent,
      componentProps: {workplace: this.workplace , dayNumber: this.dayNumber}
    });

    modal.onDidDismiss()
    .then(data => {
      if (data.data !== undefined) {
        console.log('Adding Session' , data.data);
        this.arraySession.push(data.data);
      }
    });

    modal.present();
  }

  // addToMonths(mnthNumber: never) {
  //   console.log('clicked' , mnthNumber);
  //   const index = this.mnthList.indexOf(mnthNumber);
  //   if (index < 0) {
  //     this.mnthList.push(mnthNumber);
  //   } else {
  //     this.mnthList = this.mnthList.filter((mnth) => {
  //       if (mnth !== mnthNumber) {
  //         return mnth;
  //       }
  //     });
  //   }
  // }

  createSession(sessions: DoctorSessionInfoDTO[] , success , error) {
    console.log(sessions);
    
    this.commandResourceService.createSessionInfoByDatesUsingPOST(sessions
    ).subscribe(data => {
      success();
    }, err => {
      error();
    });
  }

  public addSessions(sessions: DoctorSessionInfoDTO[], success , error) {
    console.log(sessions);
    
    this.createSession(sessions , () => {
      // this.initSessions(true);
      success();
    }, error);
  }

  saveSession() {
    console.table(this.arraySession);
    if (this.arraySession.length > 0) {
      this.addSessions(this.arraySession, () => { this.dismiss();
      }, () => {    });
    } else {

      // Add Session first
    }
  }

  removeSession(session) {

  }

  editSession(session) {

  }

  getDoctorSessions(username: string , wid: number , pageNumber) {
    return this.queryResourceService.findAllSesionInfoByDoctorsWorkPlaceUsingGET({
      doctorIdpCode: username,
      workPlaceId: wid,
      page:pageNumber
    });
  }

  // initSessions(fromRestAPI: boolean) {
  //   this.pageSession = 0;
  //   console.log('get service getting sesion');

  //   const localSessionMap: Map<string, SessionInfoDTO[]> = new Map();
  //   const localSessionsMapMap: Map<
  //     string,
  //     Map<string, SessionInfoDTO[]>
  //   > = new Map();
  //   localSessionsMapMap.set(AddSessionModalComponent._SESSIONS_KEY , localSessionMap);

  //   const sessionGetter = (user, i, workplace) => {

      
  //     this.getDoctorSessions(user.preferred_username, workplace.id, i)
  //       .subscribe(sessions => {
  //         console.log(workplace.name, sessions);
  //         this.pageSession = sessions.totalPages;

  //         const sessionsArray = localSessionsMapMap.get(AddSessionModalComponent._SESSIONS_KEY);

  //         let workplaceSessions = [];

  //         if (sessionsArray.get(workplace.name) !== undefined) {
  //           workplaceSessions = sessionsArray.get(workplace.name);
  //         }
  //         // console.log(i, workplaceSessions);
  //         sessions.content.forEach(session => {
  //           workplaceSessions.push(session);
  //         });
  //         sessionsArray.set(workplace.name , workplaceSessions);
  //         localSessionsMapMap.set(AddSessionModalComponent._SESSIONS_KEY, sessionsArray);

  //         if (i <= this.pageSession) {
  //           i++;
  //           sessionGetter(user, i, workplace);
  //         } else {
  //           this.sessionsBehaviour.next(localSessionsMapMap);
  //         }
  //       });
  //   };

  //   const func = (user: any) => {
  //     this.queryResourceService.findWorkPlacesByDoctorIdpCodeUsingGET({
  //       doctorIdpCode:user.preferred_username})
  //       .subscribe(workplaces => {
  //         workplaces.content.forEach(workplace => {
  //           sessionGetter(user, 0, workplace);
  //         });
  //       });
  //   };

  //   if (fromRestAPI !== undefined && fromRestAPI === true) { 
  //     this.keycloakService.getCurrentUserDetails().then(func);
  //   } else {
  //     this.storage.get(AddSessionModalComponent._WORKPLACES_KEY).then(data => {
  //       if (data === null) {
  //         this.keycloakService.getCurrentUserDetails().then(func);
  //       } else {
  //         this.workplaceBehaviour.next(data);
  //       }
  //     });
  //   }
  // }


}
