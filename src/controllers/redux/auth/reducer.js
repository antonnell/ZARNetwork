import { REGISTER, LOGIN, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const sha256 = require('sha256');

const defaultState = {
  userDetail: [],
};

/**
 * @method getFormattedAuthData : To format result of authentication api (register and login).
 */

const getFormattedAuthData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.message) {
        const userAuthData = decryptPayload(data.message);
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
              userAuthDetails.xKey = xKey;
            }
            return Object.assign({}, state, {
              userDetail: userAuthDetails,
            });
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method userAuthReducer : Reducer for user authentication.
 */
const userAuthReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${REGISTER}${_SUCCESS}`: {
      const formattedData = getFormattedAuthData(state, action);

      return formattedData;
    }
    case `${LOGIN}${_SUCCESS}`: {
      const formattedData = getFormattedAuthData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userAuthReducer;
