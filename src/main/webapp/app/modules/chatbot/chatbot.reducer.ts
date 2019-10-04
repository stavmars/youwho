import axios from 'axios';
import moment, { Moment } from 'moment';
import { ISurvey } from 'app/shared/model/survey.model';
import { defaultValue as SurveyResponseDefault } from 'app/shared/model/survey-response.model';
import { IQuestionResponse } from 'app/shared/model/question-response.model';
import { addNewResponse } from 'app/shared/util/entity-utils';
import { createEntity } from 'app/entities/survey-response/survey-response.reducer';
import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  UPDATE_LAST_QUESTION: 'chatbot/UPDATE_LAST_QUESTION',
  INITIATE_SURVEY_RESPONSE: 'chatbot/INITIATE_SURVEY_RESPONSE',
  INITIATE_QUESTION_TIMER: 'chatbot/INITIATE_QUESTION_TIMER',
  ADD_QUESTION_RESPONSE: 'chatbot/ADD_QUESTION_RESPONSE',
  STORE_SURVEY_RESPONSE: 'chatbot/STORE_SURVEY_RESPONSE'
};

const initialState = {
  lastQuestionId: null,
  currentSurveyResponse: SurveyResponseDefault,
  questionStartTime: null,
  storeResult: null
};

export type ChatBotState = Readonly<typeof initialState>;

export default (state: ChatBotState = initialState, action): ChatBotState => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LAST_QUESTION:
      return {
        ...state,
        lastQuestionId: action.payload
      };
    case SUCCESS(ACTION_TYPES.INITIATE_SURVEY_RESPONSE):
      return {
        ...state,
        currentSurveyResponse: action.payload,
        storeResult: 'CREATED_SURVEY'
      };
    case ACTION_TYPES.INITIATE_QUESTION_TIMER:
      return {
        ...state,
        questionStartTime: moment()
      };
    case SUCCESS(ACTION_TYPES.ADD_QUESTION_RESPONSE):
      return {
        ...state,
        currentSurveyResponse: action.payload,
        storeResult: 'PARTIAL_SURVEY'
      };
    case SUCCESS(ACTION_TYPES.STORE_SURVEY_RESPONSE):
      return {
        ...state,
        currentSurveyResponse: action.payload,
        storeResult: 'COMPLETED_SURVEY'
      };
    default:
      return state;
  }
};

export const updateLastQuestion = questionId => ({
  type: ACTION_TYPES.UPDATE_LAST_QUESTION,
  payload: questionId
});

export const initiateSurveyResponse = (survey: ISurvey, initTime: Moment) => ({
  type: ACTION_TYPES.INITIATE_SURVEY_RESPONSE,
  payload: axios
    .post('api/survey-responses', {
      surveyId: survey.id,
      status: 'partial',
      startTime: initTime
    })
    .then(res => res.data)
});

export const initiateQuestionTimer = () => ({
  type: ACTION_TYPES.INITIATE_QUESTION_TIMER
});

export const addQuestionResponse = (questionResponse: IQuestionResponse) => (dispatch, getState) => {
  const { currentSurveyResponse } = getState().chatBot;

  return dispatch({
    type: ACTION_TYPES.ADD_QUESTION_RESPONSE,
    payload: axios.put(`/api/survey-responses/${currentSurveyResponse.id}/response`, questionResponse).then(res => res.data)
  });
};

export const storeSurveyResponse = () => (dispatch, getState) => {
  const { currentSurveyResponse } = getState().chatBot;

  return dispatch({
    type: ACTION_TYPES.STORE_SURVEY_RESPONSE,
    payload: axios
      .put('/api/survey-responses', {
        ...currentSurveyResponse,
        endTime: moment(),
        status: 'completed'
      })
      .then(res => res.data)
  });
};
