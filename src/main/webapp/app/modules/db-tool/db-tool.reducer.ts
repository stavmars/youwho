import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';
import axios from 'axios';
import { ISurveyResponse } from 'app/shared/model/survey-response.model';

export const ACTION_TYPES = {
  FETCH_NON_EMPTY_SURVEYRESPONSE_LIST: 'dbTool/FETCH_NON_EMPTY_SURVEYREPSONE_LIST',
  FETCH_COMPLETED_SURVEYRESPONSE_LIST: 'dbTool/FETCH_COMPLETED_SURVEY_RESPONSE_LIST',
  FETCH_AVERAGE_COMPLETION_TIME: 'dbTool/FETCH_AVERAGE_COMPLETION_TIME'
};

const initialState = {
  nonEmptyEntities: [] as ReadonlyArray<ISurveyResponse>,
  completedEntities: [] as ReadonlyArray<ISurveyResponse>,
  averageCompletionTime: null,
  loading: false,
  errorMessage: null
};

export type DbToolState = Readonly<typeof initialState>;

export default (state: DbToolState = initialState, action): DbToolState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NON_EMPTY_SURVEYRESPONSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPLETED_SURVEYRESPONSE_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NON_EMPTY_SURVEYRESPONSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPLETED_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NON_EMPTY_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        nonEmptyEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLETED_SURVEYRESPONSE_LIST):
      return {
        ...state,
        loading: false,
        completedEntities: action.payload.data
      };
    default:
      return state;
  }
};

// Actions

export const getNonEmptyEntities: ICrudGetAllAction<ISurveyResponse> = () => {
  const requestUrl = 'api/survey-responses/non-empty';
  return {
    type: ACTION_TYPES.FETCH_NON_EMPTY_SURVEYRESPONSE_LIST,
    payload: axios.get<ISurveyResponse>(requestUrl)
  };
};

export const getCompletedEntities: ICrudGetAllAction<ISurveyResponse> = () => {
  const requestUrl = 'api/survey-responses/completed';
  return {
    type: ACTION_TYPES.FETCH_COMPLETED_SURVEYRESPONSE_LIST,
    payload: axios.get<ISurveyResponse>(requestUrl)
  };
};
