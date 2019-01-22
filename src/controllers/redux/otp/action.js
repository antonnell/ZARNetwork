import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method sendOtp : Action for send Otp api.
 * @param {object} data :  Encrypted data for send Otp.
 */
export const sendOtp = data =>
  action({
    type: actions.SENDOTP,
    payload: {
      request: {
        url: actions.sendOtpUrl,
        method: 'POST',
        data,
      },
    },
  });

/**
 * @method validateOtp : Action for validate Otp api.
 * @param {object} data :  Encrypted data for validate Otp.
 */
export const validateOtp = data =>
  action({
    type: actions.VALIDATEOTP,
    payload: {
      request: {
        url: actions.validateOtpUrl,
        method: 'POST',
        data,
      },
    },
  });
