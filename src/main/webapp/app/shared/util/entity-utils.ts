import _ from 'lodash';
import axios from 'axios';
import { IQuestionResponse } from 'app/shared/model/question-response.model';
import cloneDeep from 'lodash/cloneDeep';

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

  return _.pick(entity, keysToKeep);
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

export const exportToCsv = (filename: string, rows: object[]) => {
  if (!rows || !rows.length) {
    return;
  }
  const separator = ',';
  const maxRow = _.maxBy(rows, row => Object.keys(row).length);
  const keys = Object.keys(maxRow);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
            if (cell.search(/([",\n])/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export const reflatten = items => {
  const reflatted = [];

  items.forEach(item => {
    let array = false;

    for (const key of Object.keys(item)) {
      if (Array.isArray(item[key])) {
        array = true;

        // @ts-ignore
        const children = Array(item[key].length)
          .fill()
          .map(() => cloneDeep(item));

        for (let i = 0; i < children.length; i++) {
          const keys = Object.keys(children[i][key][i]);

          keys.forEach(k => {
            children[i][`${key}.${k}`] = children[i][key][i][k];
          });
          delete children[i][key];
          reflatted.push(children[i]);
        }
        break;
      }
    }
    if (!array) {
      reflatted.push(item);
    }
  });

  return reflatted.length === items.length ? reflatted : reflatten(reflatted);
};

export const chainRequests = (reqAmount: number, size: number, requestUrl: string) => {
  const totalPages = Math.floor(reqAmount / size) + (reqAmount % size > 0 ? 1 : 0);
  let index = 0;
  let data = [];

  const request = () =>
    axios.get(`${requestUrl}?page=${index}&size=${size}`).then(response => {
      data = data.concat(response.data);
      index++;
      return index >= totalPages ? data : request();
    });
  return request();
};
