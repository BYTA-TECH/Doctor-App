import { Component, OnInit } from '@angular/core';
import { WorkPlaceDTO, DoctorDTO } from 'src/app/api/models';
import { AddWorkplaceModalComponent } from '../add-workplace-modal/add-workplace-modal.component';
import { ModalController } from '@ionic/angular';
import { QueryResourceService , CommandResourceService} from 'src/app/api/services';
import { KeycloakService } from './../../services/keycloak.service';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Util } from 'src/app/services/util';

@Component({
  selector: 'app-profile-workplaces',
  templateUrl: './profile-workplaces.component.html',
  styleUrls: ['./profile-workplaces.component.scss'],
})
export class ProfileWorkplacesComponent implements OnInit {

  static _WORKPLACES_KEY = 'workplaces';
  exclude: string[] = [];

  doctor: DoctorDTO;

  workplaces: WorkPlaceDTO[] = [];
  private doctorBehaviour = new BehaviorSubject<DoctorDTO>(this.doctor);

  private workplaceBehaviour = new BehaviorSubject<WorkPlaceDTO[]>(this.workplaces);

  constructor(private modalController: ModalController,
              private commandResourceService: CommandResourceService,
  			         private queryResourceService: QueryResourceService,
  			         private keycloakService: KeycloakService,
                 private storage: Storage,
                 private util: Util) { }

  ngOnInit() {
  this.getDoctor();
  this.getWorkplaces();
  }

getDoctor(){
  
    this.keycloakService.getCurrentUserDetails()
    .then((user: any) => {
      this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username)
      .subscribe(doctor => {
        this.doctor = doctor;

    });
  });
}

  getWorkplaces() {
    this.keycloakService.getCurrentUserDetails()
    .then((user: any) => {
      this.queryResourceService.findWorkPlacesByDoctorIdpCodeUsingGET(user.preferred_username)
      .subscribe(pageofworkplace => {
        console.log(pageofworkplace);
        pageofworkplace.content.forEach(workplace=>{
          this.workplaces.push(workplace);
        });
    });
  });
  }

  // public deleteWorkplaces(id) {
  //   // this.deleteWorkplace(id)
  //   // .subscribe(() => {
  //   //   // this.initWorkplaces(true);
  //   // });
  // }

  // public initWorkplaces(fromRestAPI ? : boolean) {
  //   const func = (user: any) => {
  //       this.queryResourceService.findWorkPlacesByDoctorIdpCodeUsingGET({
  //         doctorIdpCode: user.preferred_username}).subscribe(workplaces => {
  //         this.workplaceBehaviour.next(workplaces.content);
  //         this.storage.set(ProfileWorkplacesComponent._WORKPLACES_KEY, workplaces);
  //       });
  //   };

  //   if(fromRestAPI !== undefined && fromRestAPI === true); {
  //     this.keycloakService.getCurrentUserDetails().then(func);
  //   } else {
  //     this.storage.get(ProfileWorkplacesComponent._WORKPLACES_KEY).then(data => {
  //       if (data === null) {
  //         this.keycloakService.getCurrentUserDetails().then(func);
  //       } else {
  //         this.workplaceBehaviour.next(data);
  //       }
  //     });
  //   }
  // }

  // deleteWorkplace(id) {
  //   return this.commandResourceService.deleteWorkPlaceUsingDELETE(id);
  // }

  async addWorkplaceModal() {
    const modal = await this.modalController.create({
      component: AddWorkplaceModalComponent,
      componentProps: { exclude: this.exclude , did: this.doctor.id}
    });
    modal.present();
  }

  async updateWorkplaceModal(workPlaceUpdate) {
    const modal = await this.modalController.create({
      component: AddWorkplaceModalComponent,
      componentProps: { exclude: this.exclude , workPlace: workPlaceUpdate, updateMode: true}
    });
    modal.present();
  }
}
