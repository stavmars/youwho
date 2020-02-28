import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';
import axios from 'axios';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';

export const ACTION_TYPES = {
  COUNT_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/FETCH_NON_EMPTY_SURVEYREPSONE_LIST',
  COUNT_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/FETCH_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_AVERAGE_COMPLETION_TIME: 'dbTool/FETCH_AVERAGE_COMPLETION_TIME'
};

const initialState = {
  nonEmptyEntitiesCount: 0,
  completedEntitiesCount: 0,
  averageCompletionTime: null,
  loading: false,
  errorMessage: null
};

export type DbToolState = Readonly<typeof initialState>;

export default (state: DbToolState = initialState, action): DbToolState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.COUNT_NON_EMPTY_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.COUNT_COMPLETED_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME):
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

export const getAverageSurveyResponseTime = surveyId => {
  const requestUrl = 'api/survey-responses/avgTime/';
  return {
    type: ACTION_TYPES.FETCH_AVERAGE_COMPLETION_TIME,
    payload: axios.get(requestUrl + surveyId)
  };
};
