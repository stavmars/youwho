import { Moment } from 'moment';

export interface ISurveyResponse {
  id?: string;
  startTime?: Moment;
  endTime?: Moment;
  status?: string;
  surveyId?: string;
}

export const defaultValue: Readonly<ISurveyResponse> = {};
