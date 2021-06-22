import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';
import { computeProfilingResults } from 'app/modules/survey-chat/chatbot.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
import { chainRequests, reflatten } from 'app/shared/util/entity-utils';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import * as flat from 'flat';

export const ACTION_TYPES = {
  FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/FETCH_ALL_NON_EMPTY_SURVEYREPSONE_LIST',
  FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/FETCH_ALL_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS: 'dbTool/FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS',
  UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS: 'dbTool/UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS',
  COUNT_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/COUNT_NON_EMPTY_SURVEYREPSONE_LIST',
  COUNT_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/COUNT_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_AVERAGE_COMPLETION_TIME: 'dbTool/FETCH_AVERAGE_COMPLETION_TIME',
  FORMAT_DATA_FOR_CSV: 'dbTool/FORMAT_DATA_FOR_CSV'
};

const initialState = {
  nonEmptyEntitiesCount: 0,
  completedEntitiesCount: 0,
  corruptedEntities: [] as ReadonlyArray<ISurveyResponse>,
  allNonEmptyEntities: [] as ReadonlyArray<ISurveyResponse>,
  allCompletedEntities: [] as ReadonlyArray<ISurveyResponse>,
  exportData: [],
  averageCompletionTime: null,
  duplicateAnswersRemoved: false,
  loading: false,
  errorMessage: null
};

export type DbToolState = Readonly<typeof initialState>;

export default (state: DbToolState = initialState, action): DbToolState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
    case REQUEST(ACTION_TYPES.FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS):
    case REQUEST(ACTION_TYPES.UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
    case FAILURE(ACTION_TYPES.FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS):
    case FAILURE(ACTION_TYPES.UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        nonEmptyEntitiesCount: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        completedEntitiesCount: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        allNonEmptyEntities: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        allCompletedEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS):
      return {
        ...state,
        loading: false,
        corruptedEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS):
      return {
        ...state,
        loading: false,
        duplicateAnswersRemoved: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
      return {
        ...state,
        loading: false,
        averageCompletionTime: action.payload.data
      };
    case ACTION_TYPES.FORMAT_DATA_FOR_CSV:
      return {
        ...state,
        loading: false,
        exportData: action.payload
      };
    default:
      return state;
  }
};

// Actions

export const countNonEmptyEntities = surveyId => {
  const requestUrl = `api/survey-responses/${surveyId}/non-empty`;

  return {
    type: ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const countCompletedEntities = surveyId => {
  const requestUrl = `api/survey-responses/${surveyId}/completed/`;
  return {
    type: ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const getAllNonEmptyEntities = (size: number) => async (dispatch, getState) => {
  const { nonEmptyEntitiesCount } = getState().dbTool;

  return dispatch({
    type: ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST,
    payload: chainRequests(nonEmptyEntitiesCount, size, 'api/survey-responses/students/all/non-empty')
  });
};

export const getAllCompletedEntities = surveyId => {
  const requestUrl = `api/survey-responses/${surveyId}/all/completed`;
  return {
    type: ACTION_TYPES.FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

/*export const findAndCleanAllCompletedWithDuplicateAnswers = () => {
  const requestUrl = 'api/survey-responses/duplicate/answers/completed';
  return {
    type: ACTION_TYPES.FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS,
    payload: axios.get(requestUrl)
  };
};*/

/*export const computeResultsOfDuplicateAnswers = (survey: ISurvey) => (dispatch, getState) => {
  const { corruptedEntities } = getState().dbTool;
  return {
    type: ACTION_TYPES.UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS,
    payload: Promise.all(
      corruptedEntities.map(entity => {
        entity.profilingResults = computeProfilingResults(survey, entity);
        axios.put('api/survey-responses', entity).then(res => res.data);
      })
    )
      .then(() => dispatch(findAndCleanAllCompletedWithDuplicateAnswers()))
      .catch(e => e)
  };
};*/

export const getAverageSurveyResponseTime = surveyId => {
  const requestUrl = `api/survey-responses/${surveyId}/avgTime/`;
  return {
    type: ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME,
    payload: axios.get(requestUrl)
  };
};

const calculateTimElapsed = (start: Moment, end: Moment) => {
  const ms = moment(end).diff(start);
  const d = moment.duration(ms);
  return `${d.hours() ? d.hours() + 'h' : ''}${d.minutes()}m${d.seconds()}s`;
};

export const formatDataForCsv = (allNonEmptyEntities: ReadonlyArray<ISurveyResponse>, survey: Readonly<ISurvey>) => async dispatch => {
  const questions = _.keyBy(survey.questions, 'id');
  const dataToExport = [];

  allNonEmptyEntities.forEach(response => {
    const questionResponses = response.questionResponses;
    const questionResponsesToExport = [];
    questionResponses.forEach(questionResponse => {
      const responseChoices = _.keyBy(questions[questionResponse.questionId].responseChoices, 'id');
      questionResponsesToExport.push({
        question: questions[questionResponse.questionId].text,
        answerTime: questionResponse.endTime ? calculateTimElapsed(questionResponse.startTime, questionResponse.endTime) : '',
        answer:
          questionResponse.choiceIds.length === 1
            ? [
                parseInt(responseChoices[questionResponse.choiceIds[0]].text, 10) !== 0 &&
                parseInt(responseChoices[questionResponse.choiceIds[0]].text, 10) < 100
                  ? responseChoices[questionResponse.choiceIds[0]].description
                  : responseChoices[questionResponse.choiceIds[0]].text,
                ''
              ]
            : questionResponse.choiceIds.map(choiceId =>
                parseInt(responseChoices[choiceId].text, 10) !== 0 && parseInt(responseChoices[choiceId].text, 10) < 100
                  ? responseChoices[choiceId].description
                  : responseChoices[choiceId].text
              )
      });
    });
    dataToExport.push({
      id: response.id,
      status: response.status,
      date: moment(response.startTime).format('DD MM YYYY'),
      totalTime: response.status === 'completed' ? calculateTimElapsed(response.startTime, response.endTime) : '',
      questionResponses: questionResponsesToExport
    });
  });
  const rows = [];

  for (const item of dataToExport) {
    const flatted = [flat.flatten(item)];
    rows.push(...reflatten(flatted));
  }
  const a = rows[99];
  rows[99] = rows[0];
  rows[0] = a;

  return dispatch({
    type: ACTION_TYPES.FORMAT_DATA_FOR_CSV,
    payload: rows
  });
};
