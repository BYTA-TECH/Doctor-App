/* tslint:disable */
export interface SessionInfoDTO {
  sessionName?: string;
  date?: string;
  fromTime?: string;
  id?: number;
  interval?: number;
  doctorIdpCode?: string;
  sessionStatus?: 'AVAILABLE' | 'PENDING' | 'RESERVED' | 'CANCELLED';
  statusId?: number;
  toTime?: string;
  weekDay?: number;
  workPlaceId?: number;
}
