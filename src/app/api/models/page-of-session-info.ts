/* tslint:disable */
import { SessionInfo } from './session-info';
import { Sort } from './sort';
export interface PageOfSessionInfo {
  content?: Array<SessionInfo>;
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
