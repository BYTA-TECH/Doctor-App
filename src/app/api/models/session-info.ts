/* tslint:disable */
import { WorkPlace } from './work-place';
export interface SessionInfo {
  date?: string;
  fromTime?: string;
  id?: number;
  interval?: number;
  sessionName?: string;
  toTime?: string;
  workPlace?: WorkPlace;
}
