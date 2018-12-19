/* eslint-disable no-console */
import { REGISTER, LOGIN, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const sha256 = require('sha256');

const defaultState = {};

/**
 * @method getFormattedAuthData : To format result of authentication api's (register and login)
 */

const getFormattedAuthData = action => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      console.log('data in auth : ', data);
      if (data.message) {
        const userAuthData = decryptPayload(data.message);
        console.log('userAuthData after decryption : ', userAuthData);
        if (userAuthData.status === 'success' && userAuthData.payload) {
          const { payload } = userAuthData;
          if (payload) {
            const {
              created,
              description,
              email,
              jwt,
              // eslint-disable-next-line camelcase
              mobile_number,
              modified,
              // eslint-disable-next-line camelcase
              user_type_uuid,
              uuid,
            } = payload;

            const userAuthDetails = {
              created,
              description,
              email,
              jwt,
              mobile_number,
              modified,
              user_type_uuid,
              uuid,
            };

            if (jwt && jwt.token) {
              userAuthDetails.xAccessToken = jwt.token;
            }
            if (email) {
              const xKey = sha256(payload.email);
              console.log(xKey, 'xKey');
              userAuthDetails.xKey = xKey;
            }
            console.log('final userAuthDetails : ', userAuthDetails);
            return userAuthDetails;
          }
        }
      }
      return {};
    }
  }
  return {};
};

// Reducer for user authentication.
const userAuthReducer = (state = defaultState, action) => {
  console.log('state of auth reducer : ', state);
  switch (action.type) {
    case `${REGISTER}${_SUCCESS}`: {
      const formattedData = getFormattedAuthData(action);
      console.log('formattedData REGISTER : ', formattedData);
      return {
        ...state,
        ...formattedData,
      };
    }
    case `${LOGIN}${_SUCCESS}`: {
      const formattedData = getFormattedAuthData(action);
      console.log('formattedData : ', formattedData);
      return {
        ...state,
        ...formattedData,
      };
    }
    default:
      return state;
  }
};

export default userAuthReducer;
