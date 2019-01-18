import { STATUS_TYPE, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = [];

/**
 * @method getFormattedStatusTypeData : To format result of request status type api.
 */
const getFormattedStatusTypeData = action => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.message) {
        const statusTypeData = decryptPayload(data.message);
        if (statusTypeData.status === 'success' && statusTypeData.payload) {
          const { payload } = statusTypeData;
          let statusTypeDetail;
          if (payload.length) {
            statusTypeDetail = payload.slice();
          } else {
            statusTypeDetail = payload;
          }
          return statusTypeDetail;
        }
      }
      return [];
    }
  }
  return [];
};

/**
 * @method statusTypeReducer : Reducer for request status type details.
 *  */
const statusTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${STATUS_TYPE}${_SUCCESS}`: {
      const formattedData = getFormattedStatusTypeData(action);
      return {
        ...state,
        ...formattedData,
      };
    }
    default:
      return state;
  }
};

export default statusTypeReducer;
