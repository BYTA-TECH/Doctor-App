import { Storage } from '@ionic/storage';
import { KeycloakService } from './../../services/keycloak.service';
import { qualifications } from './../../mocks/qualification.list';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QualificationDTO } from 'src/app/api/models';
import { BehaviorSubject } from 'rxjs';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-add-qualification-modal',
  templateUrl: './add-qualification-modal.component.html',
  styleUrls: ['./add-qualification-modal.component.scss'],
})
export class AddQualificationModalComponent implements OnInit {

  static _QUALIFICATIONS_KEY = 'qualifications';
  firstTime = true;

  @Input() exclude: string[] = [];

  did: number;

  selected: string[] = [];

  suggestions: string[] = [];

  searchTerm: string = '';

  private qualifications: QualificationDTO[] = [];
  private qualifcationBehaviour = new BehaviorSubject<QualificationDTO[]>(
    this.qualifications
  );

  constructor(
    private modalController: ModalController,
    private keycloakService: KeycloakService,
    private storage: Storage,
    private queryResourceService: QueryResourceService,
    private commandResourceService: CommandResourceService
  ) { }

  ngOnInit() {
    this.search();
  }

  search() {
    this.firstTime = false;
    const searchTermtemp = this.searchTerm;
    this.suggestions = qualifications.filter(function(e) {
      return this.indexOf(e) < 0 && e.match(new RegExp(searchTermtemp , 'g'));
    }, this.exclude);
    console.log(this.suggestions);
  }

  select(qualification) {
    this.selected.push(qualification);
    this.exclude.push(qualification);
    this.search();

    console.log(this.selected.length);
  }

  remove(qualification) {
    this.selected = this.selected.filter(
      qualificationSelected => qualificationSelected !== qualification);
    this.exclude = this.exclude.filter(
      qualificationExcluded => qualificationExcluded != qualification);
    this.search();
  }

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    this.selected.forEach(qualificationName => {
      this.addQualification(qualificationName , this.did)
      console.log(qualificationName+"qualificationName");
      this.modalController.dismiss();
    })
  }
  public addQualification(name: string , did: number) {
    this.createQualification(name , did)
    .subscribe(qualificationResult => {
      this.initQualifications(true);
    });
    console.log(name+did+"name and id");
  }

  createQualification(name, did) {
    const qualification: QualificationDTO = {};
    qualification.doctorId = did;
    qualification.qualification = name;
    console.log(qualification.doctorId+qualification.qualification+"name and id");
    return this.commandResourceService.createQualificationUsingPOST(
      qualification
    );
  }

  public initQualifications(fromRestAPI?: boolean) {
    const func = (user: any) => {
      this.queryResourceService.findAllQualificationByDoctorIdpCodeUsingGET({
        doctorIdpCode: user.preferred_username
      }).subscribe(qualifications => {
          this.qualifcationBehaviour.next(qualifications);
          this.storage.set(AddQualificationModalComponent._QUALIFICATIONS_KEY, qualifications);
        });
    };

    if (fromRestAPI !== undefined && fromRestAPI === true) {
      this.keycloakService.getCurrentUserDetails().then(func);
    } else {
      this.storage.get(AddQualificationModalComponent._QUALIFICATIONS_KEY).then(data => {
        if (data == null) {
          this.keycloakService.getCurrentUserDetails().then(func);
        } else {
          this.qualifcationBehaviour.next(data);
        }
      });
    }
  }

}
