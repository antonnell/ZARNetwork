/* eslint-disable import/prefer-default-export */
import { dispatch } from '../../store';
import { statusType } from '../redux/statusType/action';

/**
 * ******************************************************************************
 * @method getStatusType : Method for api call, to get type of request status.
 * @param {object} payload : Payload for getting data.
 *
 * -> For particuler UUID type : Payload is {status_uuid}.
 * -> For all type : Payload is empty object.
 * ******************************************************************************
 */
export const getStatusType = payload =>
  new Promise((resolve, reject) => {
    dispatch(statusType(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
