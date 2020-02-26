import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionInfoDTO, WorkPlaceDTO } from 'src/app/api/models';
import { DoctorSessionInfoDTO } from './../../api/models/doctor-session-info-dto';
import * as moment from 'moment';


@Component({
  selector: 'app-add-single-session-modal',
  templateUrl: './add-single-session-modal.component.html',
  styleUrls: ['./add-single-session-modal.component.scss'],
})
export class AddSingleSessionModalComponent implements OnInit {

  workplace: WorkPlaceDTO;

  session: DoctorSessionInfoDTO = {};

  dayNumber;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  timeStringToFloat(time) {
    return parseFloat(time.split(':')[0] + '.' + time.split(':')[1]);
  }


  addSession() {
    
    // this.session.workPlaceId = this.workplace.id;
    this.session.weekday = this.dayNumber;
    this.session.fromDate = moment(this.session.fromDate).format('YYYY-MM-DD');
    this.session.toDate = moment(this.session.toDate).format('YYYY-MM-DD');
    this.session.fromTime = this.session.fromTime;
    this.session.toTime = this.session.toTime;
    this.session.interval = this.session.interval;
    this.modalController.dismiss(this.session);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
