import { Moment } from 'moment';
import { IQuestionResponse } from 'app/shared/model/question-response.model';

export interface ISurveyResponse {
  id?: string;
  startTime?: Moment;
  endTime?: Moment;
  status?: string;
  surveyId?: string;
  questionResponses?: IQuestionResponse[];
}

export const defaultValue: Readonly<ISurveyResponse> = { questionResponses: [] };
