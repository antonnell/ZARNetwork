import { dispatch } from '../../store';
import { statusType } from '../redux/statusType/action';

/**
 * ******************************************************************************
 * @method getStatusType : Method for api call, to get type of request status.
 * @param {object} payload : Payload for getting data.
 *
 * -> For particuler UUID type : Payload is header data (xKey and xAccessToken) and uuid.
 * -> For all type : Payload is header data (xKey and xAccessToken).
 * ******************************************************************************
 */
export const getStatusType = payload =>
  new Promise((resolve, reject) => {
    dispatch(statusType(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
