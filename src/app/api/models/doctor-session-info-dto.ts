/* tslint:disable */
import { LocalTime } from './local-time';
export interface DoctorSessionInfoDTO {
  fromDate?: string;
  fromTime?: LocalTime;
  id?: number;
  interval?: number;
  toDate?: string;
  toTime?: LocalTime;
  weekday?: number;
}
