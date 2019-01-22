import { SUPPORTED_ACCOUNT_TYPE, _SUCCESS } from '../base/constants';

const defaultState = {
  types: [],
};

/**
 * @method getFormattedTypeData : To format result of supported account type api.
 */
const getFormattedTypeData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.result) {
        const typeData = data.result;
        if (typeData) {
          let supportedAccTypeDetail;
          if (typeData.length) {
            supportedAccTypeDetail = typeData.slice();
          } else {
            supportedAccTypeDetail = typeData;
          }
          return Object.assign({}, state, {
            types: supportedAccTypeDetail,
          });
        }
      }
      // if (data.message) {
      //   const typeData = decryptPayload(data.message);
      //   if (typeData.status === 'success' && typeData.payload) {
      //     const { payload } = typeData;
      //     let supportedAccTypeDetail;
      //     if (payload.length) {
      //       supportedAccTypeDetail = payload.slice();
      //     } else {
      //       supportedAccTypeDetail = payload;
      //     }
      //     return Object.assign({}, state, {
      //       types: supportedAccTypeDetail,
      //     });
      //   }
      // }
    }
  }
  return state;
};

/**
 * @method supportedAccTypeReducer : Reducer for supported account types details.
 *  */
const supportedAccTypeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${SUPPORTED_ACCOUNT_TYPE}${_SUCCESS}`: {
      const formattedData = getFormattedTypeData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default supportedAccTypeReducer;
