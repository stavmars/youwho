import pick from 'lodash/pick';
import { IQuestionResponse } from 'app/shared/model/question-response.model';

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) =>
  idList.filter((entityId: any) => entityId !== '').map((entityId: any) => ({ id: entityId }));

export const addNewResponse = (responses: ReadonlyArray<IQuestionResponse>, response: IQuestionResponse): IQuestionResponse[] => {
  if (responses.length) {
    const lastResponse = responses.slice(-1).pop();
    if (lastResponse.questionId === response.questionId) {
      return responses.slice(0, -1).concat(response);
    }
  }
  return responses.concat(response);
};

export const pivotArray = (arr: any[]) => {
  const mp = new Map();

  const setValue = (a, path, val) => {
    if (Object(val) !== val) {
      // primitive value
      const pathStr = path.join('.');
      const i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
      a[i] = val;
    } else {
      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          setValue(a, key === '0' ? path : path.concat(key), val[key]);
        }
      }
    }
    return a;
  };

  const result = arr.map(obj => setValue([], [], obj));
  return [[...mp.keys()], ...result];
};

export const toCsv = (arr: any[]) =>
  'data:text/csv;charset=utf-8,' + arr.map(row => row.map(val => (Array.isArray(val) ? toCsv(val) : val)).join(',')).join('\n');

export const downloadCSV = csvContent => {
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'my_data.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
};
