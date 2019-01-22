/*eslint-disable */
import { dispatch } from '../../store';
import { forgotPassword } from '../redux/forgotPassword/action';
// import { encrypt } from '../utility/encryption';
// import { SENDOTP, VALIDATEOTP } from '../redux/base/constants';

/**
 * ******************************************************************************
 * @method sendOtpApi : Method send Otp api call.
 * @param {object} payload : Payload for send Otp.
 * ******************************************************************************
 * @method encrypt :  To encrypt the payload sent for send Otp.
 * @param payload : Data to be encrypted.
 * @param SENDOTP : Data type to be encrypted i.e for send_Otp .
 * ******************************************************************************
 */
export const forgotPasswordApi = payload =>
  new Promise((resolve, reject) => {
    dispatch(forgotPassword(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
    // encrypt(payload, SENDOTP)
    //   .then(data => {
    //     if (data.data) {
    //       dispatch(sendOtp(data.data))
    //         .then(result => resolve(result))
    //         .catch(err => reject(err));
    //     } else {
    //       reject(new Error(data.error));
    //     }
    //   })
    //   .catch(err => reject(err));
  });
