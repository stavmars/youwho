export interface IResponseChoice {
  id?: string;
  text?: string;
  description?: string;
  type?: string;
  imageURL?: string;
  responseReaction?: string;
  redirectQuestionId?: string;
  profilingWeights?: { [key: string]: number };
}

export const defaultValue: Readonly<IResponseChoice> = {};
