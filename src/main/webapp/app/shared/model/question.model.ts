import { IResponseChoice } from 'app/shared/model/response-choice.model';

export interface IQuestion {
  id?: string;
  text?: string;
  type?: string;
  displayType?: string;
  category?: string;
  responseChoices?: IResponseChoice[];
  profilingWeights?: { [key: string]: number };
}

export const defaultValue: Readonly<IQuestion> = { responseChoices: [] };
