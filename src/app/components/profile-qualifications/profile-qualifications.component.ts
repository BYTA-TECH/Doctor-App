import { Storage } from '@ionic/storage';
import { ProfileDetailsComponent } from './../profile-details/profile-details.component';
import { KeycloakService } from './../../services/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { DoctorDTO, QualificationDTO } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { AddQualificationModalComponent } from '../add-qualification-modal/add-qualification-modal.component';

@Component({
  selector: 'app-profile-qualifications',
  templateUrl: './profile-qualifications.component.html',
  styleUrls: ['./profile-qualifications.component.scss'],
})
export class ProfileQualificationsComponent implements OnInit {
  static _QUALIFICATIONS_KEY = 'qualifications';

  doctor: DoctorDTO;

  qualifications: QualificationDTO[] = [];

  exclude: string[] = [];

  private qualifcationBehaviour = new BehaviorSubject<QualificationDTO[]>(
    this.qualifications
  );

  constructor(private modalController: ModalController,
              private commandResourceService: CommandResourceService,
              private keycloakService: KeycloakService,
              private storage: Storage,
              private queryResourceService: QueryResourceService) { }

  ngOnInit(
  ) {
    this.getDoctor();
  }

  getQualifications() {
    this.getQualification().subscribe(qualifications => {
      this.qualifications = qualifications;
      if (qualifications != undefined) {
        qualifications.forEach(qualification => {
          this.exclude.push(qualification.qualification);
        });
      }
    });
  }


  getDoctor() {
    this.storage.get('user').then(user => {
      console.log(user);
      this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username)
    .subscribe(doctor => {
      console.log(doctor);
      this.doctor = doctor;
    });
    });
  }

  public getQualification() {
    return this.qualifcationBehaviour;
  }

  async addQualificationModal() {
    const modal = await this.modalController.create({
      component: AddQualificationModalComponent,
      componentProps: { exclude: this.exclude , did: this.doctor.id}
    });
    modal.present();
  }

  // public deleteQualifications(id: number) {
  //   this.deleteQualification(id)
  //   .subscribe(() => {
  //     this.initQualifications(true);
  //   });
  // }

  // deleteQualification(id) {
  //   return this.commandResourceService.deleteQualificationUsingDELETE(id);
  // }

// public initQualifications(fromRestAPI?: boolean) {
//     const func = (user: any) => {
//       this.queryResourceService.findAllQualificationByDoctorIdpCodeUsingGET({
//         doctorIdpCode: user.preferred_username})
//         .subscribe(qualifications => {
//           this.qualifcationBehaviour.next(qualifications);
//           this.storage.set(ProfileDetailsComponent._QUALIFICATIONS_KEY, qualifications);
//         });
//     };

//     if (fromRestAPI !== undefined && fromRestAPI === true) {
//       this.keycloakService.getCurrentUserDetails().then(func);
//     } else {
//       this.storage.get(ProfileDetailsComponent._QUALIFICATIONS_KEY).then(data => {
//         if (data == null) {
//           this.keycloakService.getCurrentUserDetails().then(func);
//         } else {
//           this.qualifcationBehaviour.next(data);
//         }
//       });
//     }
//   }
}
