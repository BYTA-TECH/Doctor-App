/* tslint:disable */
import { Doctor } from './doctor';
import { Reply } from './reply';
export interface UserRatingReview {
  date?: string;
  doctor?: Doctor;
  id?: number;
  rating?: number;
  replies?: Array<Reply>;
  review?: string;
  userName?: string;
}
