import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';
import axios from 'axios';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';
import { computeProfilingResults } from 'app/modules/survey-chat/chatbot.reducer';
import { ISurvey } from 'app/shared/model/survey.model';

export const ACTION_TYPES = {
  FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/FETCH_ALL_NON_EMPTY_SURVEYREPSONE_LIST',
  FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/FETCH_ALL_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS: 'dbTool/FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS',
  UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS: 'dbTool/UPDATE_RESPONSES_WITH_DUPLICATE_ANSWERS',
  COUNT_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/COUNT_NON_EMPTY_SURVEYREPSONE_LIST',
  COUNT_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/COUNT_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_AVERAGE_COMPLETION_TIME: 'dbTool/FETCH_AVERAGE_COMPLETION_TIME'
};

const initialState = {
  nonEmptyEntitiesCount: 0,
  completedEntitiesCount: 0,
  corruptedEntities: [] as ReadonlyArray<ISurveyResponse>,
  allNonEmptyEntities: [] as ReadonlyArray<ISurveyResponse>,
  allCompletedEntities: [] as ReadonlyArray<ISurveyResponse>,
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
    case REQUEST(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
    case REQUEST(ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST):
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
        allNonEmptyEntities: action.payload.data
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
    default:
      return state;
  }
};

// Actions

export const countNonEmptyEntities = () => {
  const requestUrl = 'api/survey-responses/non-empty';
  return {
    type: ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const countCompletedEntities = () => {
  const requestUrl = 'api/survey-responses/completed';
  return {
    type: ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const getAllNonEmptyEntities = () => {
  const requestUrl = 'api/survey-responses/all/non-empty';
  return {
    type: ACTION_TYPES.FETCH_ALL_NON_EMPTY_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const getAllCompletedEntities = () => {
  const requestUrl = 'api/survey-responses/all/completed';
  return {
    type: ACTION_TYPES.FETCH_ALL_COMPLETED_SURVEYRESPONSE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const findAndCleanAllCompletedWithDuplicateAnswers = () => {
  const requestUrl = 'api/survey-responses/duplicate/answers/completed';
  return {
    type: ACTION_TYPES.FETCH_ALL_COMPLETED_WITH_DUPLICATE_ANSWERS,
    payload: axios.get(requestUrl)
  };
};

export const computeResultsOfDuplicateAnswers = (survey: ISurvey) => (dispatch, getState) => {
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
};

export const getAverageSurveyResponseTime = surveyId => {
  const requestUrl = 'api/survey-responses/avgTime/';
  return {
    type: ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME,
    payload: axios.get(requestUrl + surveyId)
  };
};
