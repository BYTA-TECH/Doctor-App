/* tslint:disable */
import { BasicCheckUp } from './basic-check-up';
import { Diagnosis } from './diagnosis';
import { Prescription } from './prescription';
import { Symptom } from './symptom';
export interface Consultation {
  basicCheckUp?: BasicCheckUp;
  date?: string;
  diagnosis?: Diagnosis;
  id?: number;
  patientIdpCode?: string;
  phoneNumber?: string;
  prescription?: Prescription;
  symptoms?: Array<Symptom>;
  trackingId?: string;
}
