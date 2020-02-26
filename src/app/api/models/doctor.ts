/* tslint:disable */
import { ContactInfo } from './contact-info';
import { DoctorSettings } from './doctor-settings';
import { PaymentSettings } from './payment-settings';
import { Qualification } from './qualification';
import { Slot } from './slot';
import { UserRatingReview } from './user-rating-review';
import { WorkPlace } from './work-place';
export interface Doctor {
  phoneNumber?: number;
  contactInfo?: ContactInfo;
  doctorSettings?: DoctorSettings;
  email?: string;
  firstName?: string;
  id?: number;
  imageLink?: string;
  paymentSettings?: PaymentSettings;
  doctorIdpCode?: string;
  practiceSince?: string;
  qualifications?: Array<Qualification>;
  registerNumber?: string;
  slots?: Array<Slot>;
  specialization?: string;
  totalRating?: number;
  userRatingReviews?: Array<UserRatingReview>;
  workPlaces?: Array<WorkPlace>;
}
