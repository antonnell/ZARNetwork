import { CREATE_PAY_REQUEST, PAY_REQUEST_DETAIL, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = {
  payRequests: [],
};

/**
 * @method getFormattedNewReqData : To format result of create request for account api.
 */

const getFormattedNewReqData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const newReqData = decryptPayload(data.message);
        if (newReqData.status === 'success' && newReqData.payload) {
          const { payload } = newReqData;
          if (state && state.payRequests) {
            const oldReqData = state.payRequests.slice();
            oldReqData.push(payload);
            const updatedState = Object.assign({}, state, {
              payRequests: oldReqData,
            });
            return updatedState;
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method getFormattedReqData : To format result of get requests for account api.
 */

const getFormattedReqData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const reqData = decryptPayload(data.message);
        if (reqData.status === 'success' && reqData.payload) {
          const { payload } = reqData;
          if (state && state.payRequests) {
            const updatedState = Object.assign({}, state, {
              payRequests: payload.slice(),
            });
            return updatedState;
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method payRequestReducer : Reducer for maintianing user requests for account details.
 */
const payRequestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${CREATE_PAY_REQUEST}${_SUCCESS}`: {
      const formattedData = getFormattedNewReqData(state, action);
      return formattedData;
    }
    case `${PAY_REQUEST_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedReqData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default payRequestReducer;
