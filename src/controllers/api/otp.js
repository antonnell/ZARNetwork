import { dispatch } from '../../store';
import { sendOtp, validateOtp } from '../redux/otp/action';
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
export const sendOtpApi = payload =>
  new Promise((resolve, reject) => {
    dispatch(sendOtp(payload))
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

/**
 * ******************************************************************************
 * @method validateOtp : Method validate Otp api call.
 * @param {object} payload : Payload for validate Otp.
 * ******************************************************************************
 * @method encrypt :  To encrypt the payload sent for validate Otp authentication.
 * @param {object} payload : Data to be encrypted.
 * @param VALIDATEOTP : Data type to be encrypted i.e for VALIDATE OTP .
 * ******************************************************************************
 */
export const validateOtpApi = payload =>
  new Promise((resolve, reject) => {
    dispatch(validateOtp(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
    // encrypt(payload, VALIDATEOTP)
    //   .then(data => {
    //     if (data.data) {
    //       dispatch(validateOtp(data.data))
    //         .then(result => resolve(result))
    //         .catch(err => reject(err));
    //     } else {
    //       reject(new Error(data.error));
    //     }
    //   })
    //   .catch(err => reject(err));
  });
