/* tslint:disable */
import { PaymentSettings } from './payment-settings';
import { ContactInfo } from './contact-info';
import { DoctorSettings } from './doctor-settings';
import { Qualification } from './qualification';
import { UserRatingReview } from './user-rating-review';
import { WorkPlace } from './work-place';
export interface Doctor {
  paymentSettings?: PaymentSettings;
  contactInfo?: ContactInfo;
  doctorIdpCode?: string;
  doctorSettings?: DoctorSettings;
  email?: string;
  firstName?: string;
  id?: number;
  imageLink?: string;
  dmsId?: string;
  phoneNumber?: number;
  practiceSince?: string;
  qualifications?: Array<Qualification>;
  registerNumber?: string;
  specialization?: string;
  totalRating?: number;
  userRatingReviews?: Array<UserRatingReview>;
  workPlaces?: Array<WorkPlace>;
}
