/* tslint:disable */
import { Doctor } from './doctor';
import { Status } from './status';
export interface Slot {
  date?: string;
  doctor?: Doctor;
  fromTime?: string;
  id?: number;
  statuses?: Array<Status>;
  toTime?: string;
}
