/* tslint:disable */
import { Doctor } from './doctor';
import { SessionInfo } from './session-info';
export interface WorkPlace {
  doctor?: Doctor;
  doctorIdpCode?: string;
  id?: number;
  location?: string;
  locationName?: string;
  name?: string;
  sessionInfos?: Array<SessionInfo>;
}
