import { dispatch } from '../../store';
import { supportedAccountType } from '../redux/types/action';

/**
 * ******************************************************************************
 * @method getAccountType : Method for api call, to get supported account types.
 * @param {object} payload : Payload for getting data.
 *
 * -> For particuler UUID type : Payload is header data (xKey and xAccessToken) and uuid.
 * -> For all type : Payload is header data (xKey and xAccessToken).
 * ******************************************************************************
 */
export const getAccountType = payload =>
  new Promise((resolve, reject) => {
    dispatch(supportedAccountType(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
