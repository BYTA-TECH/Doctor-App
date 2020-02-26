/* tslint:disable */
import { WorkPlace } from './work-place';
import { Sort } from './sort';
export interface PageOfWorkPlace {
  content?: Array<WorkPlace>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
