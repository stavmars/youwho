import { SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction } from 'react-jhipster';
import axios from 'axios';
import { IProfilingResults } from 'app/shared/model/survey-response.model';

export const ACTION_TYPES = {
  FETCH_PERSONAL_RESULTS: 'results/FETCH_PERSONAL_RESULTS',
  FETCH_TOTAL_RESULTS: 'results/FETCH_TOTAL_RESULTS',
  UPDATE_FILTERS: 'results/UPDATE_FILTERS'
};

const initialState = {
  personalResults: null,
  totalResults: null,
  filters: { gender: null, age: null }
};

export type ResultsState = Readonly<typeof initialState>;

export default (state: ResultsState = initialState, action): ResultsState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.FETCH_PERSONAL_RESULTS):
      return {
        ...state,
        personalResults: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOTAL_RESULTS):
      return {
        ...state,
        totalResults: action.payload.data
      };
    case ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    default:
      return state;
  }
};

export const getPersonalResults: ICrudGetAction<IProfilingResults> = id => {
  const requestUrl = `api/survey-responses/results/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERSONAL_RESULTS,
    payload: axios.get<IProfilingResults>(requestUrl)
  };
};

export const getTotalResults = filters => {
  const requestUrl = `api/survey-responses/total-results/youWho`;
  const questionFilters = {};
  if (filters.gender) {
    questionFilters['3'] = filters.gender;
  }
  switch (filters.age) {
    case '17-20':
      questionFilters['2'] = ['11', '12', '13', '14'];
      break;
    case '21-24':
      questionFilters['2'] = ['7', '8', '9', '10'];
      break;
    case '25-29':
      questionFilters['2'] = ['1', '2', '3', '4', '5', '6'];
      break;
    default:
      break;
  }

  return {
    type: ACTION_TYPES.FETCH_TOTAL_RESULTS,
    payload: axios.post(requestUrl, questionFilters)
  };
};

export const updateFilters = filters => dispatch => {
  dispatch({
    type: ACTION_TYPES.UPDATE_FILTERS,
    payload: filters
  });
  dispatch(getTotalResults(filters));
};
