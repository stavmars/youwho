import { IResponseChoice } from 'app/shared/model/response-choice.model';

export interface IQuestion {
  id?: string;
  text?: string;
  type?: string;
  displayType?: string;
  category?: string;
  responseChoices?: IResponseChoice[];
}

export const defaultValue: Readonly<IQuestion> = { responseChoices: [] };
