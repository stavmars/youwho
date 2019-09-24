import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface ISurvey {
  id?: string;
  name?: string;
  description?: string;
  openTime?: Moment;
  closeTime?: Moment;
  user?: IUser;
}

export const defaultValue: Readonly<ISurvey> = {};
