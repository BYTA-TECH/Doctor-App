import { TimingDetailDTO } from './../../api/models/timing-detail-dto';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionInfoDTO, WorkPlaceDTO } from 'src/app/api/models';
// import { DoctorSessionInfoDTO } from './../../api/models/doctor-session-info-dto';
import * as moment from 'moment';


@Component({
  selector: 'app-add-single-session-modal',
  templateUrl: './add-single-session-modal.component.html',
  styleUrls: ['./add-single-session-modal.component.scss'],
})
export class AddSingleSessionModalComponent implements OnInit {

  workplace: WorkPlaceDTO;

  session: TimingDetailDTO = {};

  dayNumber;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  timeStringToFloat(time) {
    return parseFloat(time.split(':')[0] + '.' + time.split(':')[1]);
  }


  addSession() {
    this.session.doctorIdpCode = this.workplace.doctorIdpCode;
    this.session.workPlaceId = this.workplace.id;//session do not have workplaceId feild
    this.session.weekday = this.dayNumber;
    this.session.fromDate = moment(this.session.fromDate).format('YYYY-MM-DD');
    this.session.toDate = moment(this.session.toDate).format('YYYY-MM-DD');
    this.session.fromTime = this.session.fromTime;
    this.session.toTime = this.session.toTime;
    // console.log('shgshgsgs', moment(this.session.fromTime).format('hh:mm:ss'));

    this.session.interval = this.session.interval;
    this.modalController.dismiss(this.session);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
