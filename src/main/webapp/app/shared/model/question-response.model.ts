import { Moment } from 'moment';

export interface IQuestionResponse {
  questionId?: string;
  startTime?: Moment;
  endTime?: Moment;
  choiceIds?: string[];
}

export const defaultValue: Readonly<IQuestionResponse> = { choiceIds: [] };
