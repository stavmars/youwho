import moment, { Moment } from 'moment';
import { ISurvey } from 'app/shared/model/survey.model';
import { defaultValue as SurveyResponseDefault } from 'app/shared/model/survey-response.model';
import { IQuestionResponse } from 'app/shared/model/question-response.model';
import { addNewResponse } from 'app/shared/util/entity-utils';
import { createEntity } from 'app/entities/survey-response/survey-response.reducer';

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
    case ACTION_TYPES.INITIATE_SURVEY_RESPONSE:
      return {
        ...state,
        currentSurveyResponse: {
          ...state.currentSurveyResponse,
          status: 'partial',
          surveyId: action.payload.survey.id,
          startTime: action.payload.initTime
        }
      };
    case ACTION_TYPES.INITIATE_QUESTION_TIMER:
      return {
        ...state,
        questionStartTime: moment()
      };
    case ACTION_TYPES.ADD_QUESTION_RESPONSE:
      return {
        ...state,
        currentSurveyResponse: {
          ...state.currentSurveyResponse,
          questionResponses: addNewResponse(state.currentSurveyResponse.questionResponses, action.payload)
        }
      };
    case ACTION_TYPES.STORE_SURVEY_RESPONSE:
      return {
        ...state,
        storeResult: action.payload
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
  payload: { survey, initTime }
});

export const initiateQuestionTimer = () => ({
  type: ACTION_TYPES.INITIATE_QUESTION_TIMER
});

export const addQuestionResponse = (questionResponse: IQuestionResponse) => ({
  type: ACTION_TYPES.ADD_QUESTION_RESPONSE,
  payload: questionResponse
});

export const storeSurveyResponse = () => (dispatch, getState) => {
  const { currentSurveyResponse } = getState().chatBot;

  dispatch(
    createEntity({
      ...currentSurveyResponse,
      endTime: moment(),
      status: 'completed'
    })
  );
};
