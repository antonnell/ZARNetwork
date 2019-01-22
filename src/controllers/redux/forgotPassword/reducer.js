import { FORGOTPASSWORD, _SUCCESS } from '../base/constants';

const sha256 = require('sha256');

const defaultState = {
  forgotPasswordDetails: null,
};

/**
 * @method getFormattedOtpData : To format result of Otp api (SENDOTP and VALIDATEOTP).
 */

const getForgotPasswordData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.result) {
        const otpData = data.result;
        if (otpData) {
          const {
            created,
            description,
            email,
            firstname,
            surname,
            jwt,
            // eslint-disable-next-line camelcase
            mobile_number,
            modified,
            // eslint-disable-next-line camelcase
            user_type_uuid,
            uuid,
          } = otpData;

          const userAuthDetails = {
            created,
            description,
            email,
            firstname,
            surname,
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
            const xKey = sha256(otpData.email);
            userAuthDetails.xKey = xKey;
          }
          return Object.assign({}, state, {
            forgotPasswordDetails: userAuthDetails,
          });
        }
      }
    }
  }
  return state;
};

/**
 * @method forgotPasswordReducer : Reducer for user authentication.
 */
const forgotPasswordReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${FORGOTPASSWORD}${_SUCCESS}`: {
      const formattedData = getForgotPasswordData(state, action);
      return formattedData;
    }

    default:
      return state;
  }
};

export default forgotPasswordReducer;
