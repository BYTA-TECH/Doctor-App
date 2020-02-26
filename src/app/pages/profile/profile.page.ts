import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Util } from 'src/app/services/util';
import { DoctorDTO, QualificationDTO, WorkPlaceDTO } from 'src/app/api/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  static resetflag = true;
  private doctor: DoctorDTO;
  private doctorBehaviour = new BehaviorSubject<DoctorDTO>(this.doctor);

  private qualifications: QualificationDTO[] = [];
  private qualifcationBehaviour = new BehaviorSubject<QualificationDTO[]>(
    this.qualifications
  );

  private workplaces: WorkPlaceDTO[] = [];
  private workplaceBehaviour = new BehaviorSubject<WorkPlaceDTO[]>(this.workplaces);

  constructor(
    private keycloakService: KeycloakService,
    private util: Util
  ) { }

  ngOnInit() {
  }

  logout() {
    this.keycloakService.logout(true);
    this.clear();
  }
  public clear() {
    this.doctorBehaviour.next(null);
    this.qualifcationBehaviour.next(null);
    this.workplaceBehaviour.next(null);
    ProfilePage.resetflag = true;
  }
  public getResetFlag() {
    return ProfilePage.resetflag;
  }
  public setResetFlag(flag: boolean) {
    ProfilePage.resetflag = flag;
  }
}
