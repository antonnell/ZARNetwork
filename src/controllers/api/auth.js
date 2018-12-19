import { dispatch } from '../../store';
import { loginUser, registerUser } from '../redux/auth/action';
import { encrypt } from '../utility/encryption';
import { LOGIN_TYPE, REGISTER_TYPE } from '../redux/base/constants';

/**
 * ******************************************************************************
 * @method register : Method register api call.
 * @param {object} payload : Payload for user registeration
 * ******************************************************************************
 * @method encrypt :  To encrypt the payload sent for user registration.
 * @param payload : Data to be encrypted.
 * @param REGISTER_TYPE : Data type to be encrypted i.e for register .
 * ******************************************************************************
 */
export const register = payload =>
  new Promise((resolve, reject) => {
    encrypt(payload, REGISTER_TYPE)
      .then(data => {
        if (data.data) {
          dispatch(registerUser(data.data))
            .then(result => resolve(result))
            .catch(err => reject(err));
        } else {
          reject(new Error(data.error));
        }
      })
      .catch(err => reject(err));
  });

/**
 * ******************************************************************************
 * @method login : Method login api call.
 * @param {object} payload : Payload for user login.
 * ******************************************************************************
 * @method encrypt :  To encrypt the payload sent for login authentication.
 * @param {object} payload : Data to be encrypted.
 * @param LOGIN_TYPE : Data type to be encrypted i.e for login .
 * ******************************************************************************
 */
export const login = payload =>
  new Promise((resolve, reject) => {
    encrypt(payload, LOGIN_TYPE)
      .then(data => {
        if (data.data) {
          dispatch(loginUser(data.data))
            .then(result => resolve(result))
            .catch(err => reject(err));
        } else {
          reject(new Error(data.error));
        }
      })
      .catch(err => reject(err));
  });
