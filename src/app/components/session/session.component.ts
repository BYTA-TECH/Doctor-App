import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SessionInfoDTO, WorkPlaceDTO, DoctorSessionInfoDTO, DoctorDTO } from 'src/app/api/models';
import { ModalController } from '@ionic/angular';
import { DAY, DAY_FULL_NAME } from 'src/app/mocks/day.list';
import { AddSessionModalComponent } from '../add-session-modal/add-session-modal.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {

  @Input() workplace: WorkPlaceDTO;
  @Input() doctor: DoctorDTO;
  @Input() sessions: DoctorSessionInfoDTO[] = [];

  currentDayListSessions: DoctorSessionInfoDTO[] = [];
  currentDay = '';
  currentDayFullName = '';
  dayNames: string[] = DAY;
  session: DoctorSessionInfoDTO = {};

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
  ];

  availabelMonths: string[] = [];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.findAvailabelMonths();
  }

  findAvailabelMonths() {
    const mnth = new Date().getMonth();
    for (let i = mnth; i < (mnth + 3); i++ ) {
      this.availabelMonths.push(this.monthNames[i]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showSessionForDay('Sun');
  }

  async addSessionsModal() {
    const modal = await this.modalController.create({
      component: AddSessionModalComponent,
      componentProps: {workplace: this.workplace , dayNumber: this.dayNames.indexOf(this.currentDay) + 1,day: this.currentDay}
    });
    modal.present();
  }

  showSessionForDay(day: string) {
    this.currentDayListSessions = [];
    this.currentDay = day;
    this.currentDayFullName = DAY_FULL_NAME[DAY.indexOf(day)];
    const dayNumber = this.dayNames.indexOf(day) + 1;
    if(this.sessions !== undefined) {
      this.sessions.forEach(session => {
        if (session.weekday === dayNumber) {
          this.currentDayListSessions.push(session);
        }
      });
      // Sorting Sessions via Date
      this.currentDayListSessions = this.currentDayListSessions.sort((a,b)=> {
        var dateA:any = new Date(a.fromDate), dateB:any = new Date(b.toDate);
        return dateA - dateB;
      });
    }
   }
}
