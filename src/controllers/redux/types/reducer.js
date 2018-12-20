import { SUPPORTED_ACCOUNT_TYPE, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = [];

/**
 * @method getFormattedTypeData : To format result of supported account type api.
 */
const getFormattedTypeData = action => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.message) {
        const typeData = decryptPayload(data.message);
        if (typeData.status === 'success' && typeData.payload) {
          const { payload } = typeData;
          let supportedAccTypeDetail;
          if (payload.length) {
            supportedAccTypeDetail = payload.slice();
          } else {
            supportedAccTypeDetail = payload;
          }
          return supportedAccTypeDetail;
        }
      }
      return [];
    }
  }
  return [];
};

/**
 * @method supportedAccTypeReducer : Reducer for supported account types details.
 *  */
const supportedAccTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${SUPPORTED_ACCOUNT_TYPE}${_SUCCESS}`: {
      const formattedData = getFormattedTypeData(action);
      return {
        ...state,
        ...formattedData,
      };
    }
    default:
      return state;
  }
};

export default supportedAccTypeReducer;
