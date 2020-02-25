import axios from 'axios';
import moment, { Moment } from 'moment';
import { ISurvey } from 'app/shared/model/survey.model';
import { getEntity as getSurvey } from 'app/entities/survey/survey.reducer';
import { defaultValue as SurveyResponseDefault, ISurveyResponse } from 'app/shared/model/survey-response.model';
import { IQuestionResponse } from 'app/shared/model/question-response.model';
import { SUCCESS } from 'app/shared/reducers/action-type.util';
import _ from 'lodash';

export const ACTION_TYPES = {
  UPDATE_LAST_QUESTION: 'chatbot/UPDATE_LAST_QUESTION',
  INITIATE_SURVEY_RESPONSE: 'chatbot/INITIATE_SURVEY_RESPONSE',
  INITIATE_QUESTION_TIMER: 'chatbot/INITIATE_QUESTION_TIMER',
  ADD_QUESTION_RESPONSE: 'chatbot/ADD_QUESTION_RESPONSE',
  UPDATE_ACTIVE_CATEGORY: 'chatbot/UPDATE_ACTIVE_CATEGORY',
  STORE_SURVEY_RESPONSE: 'chatbot/STORE_SURVEY_RESPONSE'
};

const initialState = {
  lastQuestionId: null,
  currentSurveyResponse: SurveyResponseDefault,
  questionStartTime: null,
  activeCategory: 'Εισαγωγή',
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
    case ACTION_TYPES.UPDATE_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      };
    case ACTION_TYPES.ADD_QUESTION_RESPONSE:
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

export const initiateSurveyResponse = (initTime: Moment) => async dispatch =>
  dispatch(getSurvey('youWho')).then(res =>
    dispatch({
      type: ACTION_TYPES.INITIATE_SURVEY_RESPONSE,
      payload: axios
        .post('api/survey-responses', {
          surveyId: res.value.data.id,
          status: 'partial',
          startTime: initTime
        })
        .then(storeRes => storeRes.data)
    })
  );

export const initiateQuestionTimer = () => ({
  type: ACTION_TYPES.INITIATE_QUESTION_TIMER
});

export const updateActiveCategory = activeCategory => ({
  type: ACTION_TYPES.UPDATE_ACTIVE_CATEGORY,
  payload: activeCategory
});

export const addQuestionResponse = (questionResponse: IQuestionResponse) => (dispatch, getState) => {
  const { currentSurveyResponse } = getState().chatBot;
  const updatedQuestionResponses = currentSurveyResponse.questionResponses;
  const index = _.findIndex(updatedQuestionResponses, _.pick(questionResponse, 'questionId'));
  if (index !== -1) {
    updatedQuestionResponses.splice(index, 1, questionResponse);
  } else {
    updatedQuestionResponses.push(questionResponse);
  }
  const updatedSurveyResponse = {
    ...currentSurveyResponse,
    questionResponses: updatedQuestionResponses
  };
  axios.put(`api/survey-responses`, updatedSurveyResponse);

  return dispatch({
    type: ACTION_TYPES.ADD_QUESTION_RESPONSE,
    payload: updatedSurveyResponse
  });
};

export const storeSurveyResponse = (survey: ISurvey) => (dispatch, getState) => {
  const { currentSurveyResponse } = getState().chatBot;
  currentSurveyResponse.profilingResults = computeProfilingResults(survey, currentSurveyResponse);
  return dispatch({
    type: ACTION_TYPES.STORE_SURVEY_RESPONSE,
    payload: axios
      .put('api/survey-responses', {
        ...currentSurveyResponse,
        endTime: moment(),
        status: 'completed'
      })
      .then(res => res.data)
  });
};

const computeProfilingResults = (survey: ISurvey, surveyResponse: ISurveyResponse) => {
  const profilingResults = {};
  survey.profilingVariables.forEach(profilingVariable => {
    const result = survey.questions
      .filter(question => question.profilingWeights && question.profilingWeights[profilingVariable.id] && question.type !== 'multi_select')
      .reduce(
        (acc, question) => {
          const choiceId = surveyResponse.questionResponses.find(questionResponse => questionResponse.questionId === question.id)
            .choiceIds[0];
          const responseChoiceWeight = question.responseChoices.find(value => value.id === choiceId).profilingWeights[profilingVariable.id];
          const questionWeight = question.profilingWeights[profilingVariable.id];
          return responseChoiceWeight == null ? acc : [acc[0] + questionWeight * responseChoiceWeight, acc[1] + questionWeight];
        },
        [0, 0]
      );
    if (result[1]) {
      profilingResults[profilingVariable.id] = result[0] / result[1];
    }
  });
  return profilingResults;
};
