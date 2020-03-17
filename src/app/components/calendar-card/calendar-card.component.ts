import { KeycloakService } from './../../services/keycloak.service';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DAY, DAY_FULL_NAME } from 'src/app/mocks/day.list';
import { SessionInfo, TimingDetailDTO, DoctorDTO, WorkPlaceDTO } from 'src/app/api/models';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-card',
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.scss'],
})
export class CalendarCardComponent implements OnInit {
  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;
  doctor: DoctorDTO;
  user;
  currentDay = '';
  dayNames: string[] = DAY;
  currentDayListSessions: SessionInfo[] = [];

  currentDayFullName = '';

  session: TimingDetailDTO = {};


  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  collapseCard = false;

  sessions: TimingDetailDTO[];

  event = {
    startTime: '',
    endTime: '',
    fromTime: '',
    toTime: '',
    weekDay: '',
    allDay: false,

  };

  viewTitle = '';

  @Input() workplace: WorkPlaceDTO;

  dayNumber;

  constructor(private queryResourceService: QueryResourceService,
              private keycloakService: KeycloakService,
              private commandResourceService: CommandResourceService) { }

  ngOnInit() {
    this.getCurrentUserDetails();
    this.resetEvent();
  }
  resetEvent() {
    this.event = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      fromTime: '',
      toTime: '',
      weekDay: '',
      allDay: false
    };
  }

  getCurrentUserDetails() {
    this.keycloakService.getCurrentUserDetails()
    .then(user => {
      this.user = user;
      this.getDocterbyIdpCode(user);

    });
  }

  getDocterbyIdpCode(user: any) {
    return this.queryResourceService.findDoctorByDoctorIdpCodeUsingGET(user.preferred_username).subscribe(doctor => {
      this.doctor = doctor; });
  }

  today() {
    this.calendar.currentDate = new Date();
  }
  addEvent() {
    this.session.doctorIdpCode = this.workplace.doctorIdpCode;
    this.session.workPlaceId = this.workplace.id;//session do not have workplaceId feild
    this.session.weekday = this.dayNumber;
    this.session.fromDate = moment(this.event.startTime).format('YYYY-MM-DD');
    this.session.toDate = moment(this.event.endTime).format('YYYY-MM-DD');
    this.session.fromTime = this.session.fromTime;
    this.session.toTime = this.session.toTime;
    console.log('shgshgsgs');

    this.session.interval = this.session.interval;
    this.commandResourceService.createSessionInfoByDatesUsingPOST(this.sessions
      ).subscribe(data => {console.log(data);
      
      });
    const eventCopy = {
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      fromTime: this.event.fromTime,
      toTime: this.event.toTime,
      WeekDay: this.event.weekDay,
      allDay: this.event.allDay
      
    }
    if(eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDay()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth(),end.getUTCDay()));
    }
    this.eventSource.push(eventCopy); 
    this.myCal.loadEvents();
    this.resetEvent();
    console.log(this.event.weekDay);
    
    
  }

  onChange($event) {
    console.log($event);
  }

  onCurrentDateChanged() {

  }
  onEventSelected() {

  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected() {

  }
  getSessions(day) {
    // this.currentDayListSessions = [];
    this.currentDay = day;
    this.currentDayFullName = DAY_FULL_NAME[DAY.indexOf(day)];
  //   return this.queryResourceService. findAllSesionInfoByWeekdayUsingGET({
  //     doctorIdpCode: this.user.preferred_username,
  //     weekday: this.dayNames.indexOf(day) + 1,
  // }).subscribe(sesion => {
  //   this.currentDayListSessions = sesion.content;
  //   console.log(sesion.content);

  // });
  }
}
