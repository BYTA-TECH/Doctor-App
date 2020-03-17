import { WorkPlace } from './../../api/models/work-place';
// import { FindAllSesionInfoByWeekdayUsingGETParams } from './../../api/services/query-resource.service';
import { KeycloakService } from "./../../services/keycloak.service";
import {
  CommandResourceService,
  QueryResourceService
} from "src/app/api/services";
import { TimingDetailDTO } from "./../../api/models/timing-detail-dto";
import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ViewChild,
  LOCALE_ID,
  Inject
} from "@angular/core";
import {
  SessionInfoDTO,
  WorkPlaceDTO,
  DoctorDTO,
  SessionInfo
} from "src/app/api/models";
import { ModalController, AlertController } from "@ionic/angular";
import { DAY, DAY_FULL_NAME } from "src/app/mocks/day.list";
import { AddSessionModalComponent } from "../add-session-modal/add-session-modal.component";
import { CalendarComponent } from "ionic2-calendar/calendar";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  @ViewChild(CalendarComponent, null) myCal: CalendarComponent;

  @Input() workplace: WorkPlaceDTO;
  @Input() doctor: DoctorDTO;
  @Input() sessions: TimingDetailDTO[] = [];
  user;

  currentDayListSessionsMap: {} = {};
  currentDayListSessions = [];
  currentDay = "";
  currentDayFullName = "";
  dayNames: string[] = DAY;
  session: TimingDetailDTO = {};
  @Input() sesn: SessionInfoDTO = {};

  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  eventSource = [];

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  collapseCard = false;

  event = {
    startTime: "",
    endTime: "",
    fromTime: "",
    toTime: "",
    allDay: true,
    weekDay: "",
    interval: ""
  };

  viewTitle = "";

  minDate = new Date().toISOString();

  availabelMonths: string[] = [];

  constructor(
    private modalController: ModalController,
    private commandResourceService: CommandResourceService,
    private queryResourceService: QueryResourceService,
    private keycloakService: KeycloakService,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale
  ) {}

  ngOnInit() {
    this.findAvailabelMonths();
    this.getCurrentUserDetails();

    this.resetEvent();
  }

  getCurrentUserDetails() {
    this.keycloakService.getCurrentUserDetails().then(user => {
      this.user = user;
      this.getDocterbyIdpCode(user);
    });
  }

  getDocterbyIdpCode(user: any) {
    return this.queryResourceService
      .findDoctorByDoctorIdpCodeUsingGET(user.preferred_username)
      .subscribe(doctor => {
        this.doctor = doctor;
      });
  }

  getSessions(dayNumber , wrkplaceId) {
    return this.queryResourceService
      .findAllSesionInfoByWeekdayUsingGET({
        doctorIdpCode: this.user.preferred_username,
        weekday: dayNumber,
      workPlaceId: wrkplaceId
         
      })
      .subscribe(sesion => {
        this.currentDayListSessionsMap[dayNumber] = sesion.content;
        console.log(sesion.content);
      });
  }

  resetEvent() {
    this.event = {
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      fromTime: "",
      toTime: "",
      weekDay: "",
      allDay: true,
      interval: ""
    };
  }

  onCurrentDateChanged(event) {
    const dateObject = new Date(event);
    const date = dateObject.toISOString().split("T")[0];
    console.log(date);

    this.getSessions(dateObject.getDay(), () => {
      for (const dayListSession of this.currentDayListSessions) {
        if (dayListSession.date === date) {
          console.log(this.session);
          const eventCopy = {
            startTime: new Date(dayListSession.fromTime),
            endTime: new Date(dayListSession.toTime),
            fromTime: dayListSession.fromTime,
            toTime: dayListSession.toTime,
            WeekDay: dayListSession.weekDay,
            interval: dayListSession.interval
          };
          console.log(eventCopy);
          this.eventSource.push(eventCopy);
          this.myCal.loadEvents();
        }
      }
    });
  }

  onEventSelected() {}

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(event) {}

  findAvailabelMonths() {
    const mnth = new Date().getMonth();
    for (let i = mnth; i < mnth + 3; i++) {
      this.availabelMonths.push(this.monthNames[i]);
    }
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  updateWorkPlace(work) {
    console.log("updated workplace", work);
    return this.commandResourceService
      .updateWorkPlaceUsingPUT(work)
      .subscribe();
  }

  async addSessionsModal() {
    const modal = await this.modalController.create({
      component: AddSessionModalComponent,
      componentProps: {
        workplace: this.workplace,
        dayNumber: this.dayNames.indexOf(this.currentDay) + 1,
        day: this.currentDay
      }
    });
    modal.present();
  }

  slideto() {}

  sessionCreate(day) {
    this.currentDay = day;
    this.currentDayFullName = DAY_FULL_NAME[DAY.indexOf(day)];
    const dayNumber = this.dayNames.indexOf(day) + 1;
  }
}
