import {
  CREATE_PAY_REQUEST,
  PAY_REQUEST_DETAIL,
  CREATE_MERCHANT_PAY_REQUEST,
  GET_MERCHANT_PAY_REQUEST,
  _SUCCESS,
} from '../base/constants';

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
      if (data.result) {
        const newReqData = data.result;
        if (newReqData) {
          if (state && state.payRequests) {
            const oldReqData = state.payRequests.slice();
            oldReqData.push(newReqData);
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
      if (data.result) {
        const reqData = data.result;
        if (reqData) {
          if (state && state.payRequests) {
            const updatedState = Object.assign({}, state, {
              payRequests: reqData.slice(),
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
    case `${CREATE_MERCHANT_PAY_REQUEST}${_SUCCESS}`: {
      const formattedData = getFormattedNewReqData(state, action);
      return formattedData;
    }
    case `${GET_MERCHANT_PAY_REQUEST}${_SUCCESS}`: {
      const formattedData = getFormattedReqData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default payRequestReducer;
