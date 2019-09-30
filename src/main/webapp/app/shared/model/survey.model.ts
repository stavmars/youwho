import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface ISurvey {
  id?: string;
  name?: string;
  description?: string;
  openTime?: Moment;
  closeTime?: Moment;
  questions?: IQuestion[];
  user?: IUser;
}

export const defaultValue: Readonly<ISurvey> = { questions: [] };
