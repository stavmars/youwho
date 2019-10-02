import axios from 'axios';
import _ from 'lodash';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ISurvey, defaultValue as SurveyDefault } from 'app/shared/model/survey.model';
import { IQuestion, defaultValue as QuestionDefault } from 'app/shared/model/question.model';
import { ISurveyResponse, defaultValue as SurveyResponseDefault } from 'app/shared/model/survey-response.model';
import { IQuestionResponse, defaultValue as QuestionResponseDefault } from 'app/shared/model/question-response.model';
import { IResponseChoice, defaultValue as ResponseChoiceDefault } from 'app/shared/model/response-choice.model';

export const ACTION_TYPES = {
  UPDATE_LAST_QUESTION: 'chatbot/UPDATE_LAST_QUESTION'
};

const initialState = {
  lastQuestionId: null,
  errorMessage: null,
  working: false,
  currentSurvey: SurveyDefault,
  currentSurveyResponse: SurveyResponseDefault
};

export type ChatBotState = Readonly<typeof initialState>;

export default (state: ChatBotState = initialState, action): ChatBotState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LAST_QUESTION:
      return {
        ...state,
        working: false,
        lastQuestionId: action.payload
      };
    default:
      return state;
  }
};

export const updateLastQuestion = questionId => ({
  type: ACTION_TYPES.UPDATE_LAST_QUESTION,
  payload: questionId
});
