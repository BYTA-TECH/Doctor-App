/* tslint:disable */
import { Status } from './status';
import { WorkPlace } from './work-place';
export interface SessionInfo {
  sessionName?: string;
  date?: string;
  fromTime?: string;
  id?: number;
  interval?: number;
  doctorIdpCode?: string;
  sessionStatus?: 'AVAILABLE' | 'PENDING' | 'RESERVED' | 'CANCELLED';
  status?: Status;
  toTime?: string;
  weekDay?: number;
  workPlace?: WorkPlace;
}
