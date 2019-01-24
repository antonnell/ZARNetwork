import action from '../base/action';
import * as actions from '../base/constants';

/**
 * @method registerUser : Action for register api.
 * @param {object} data : Encrypted data for user registeration.
 */
export const registerUser = data =>
  action({
    type: actions.REGISTER,
    payload: {
      request: {
        url: actions.registerUrl,
        method: 'POST',
        data,
      },
    },
  });

/**
 * @method loginUser : Action for login api.
 * @param {object} data :  Encrypted data for user login.
 */
export const loginUser = data =>
  action({
    type: actions.LOGIN,
    payload: {
      request: {
        url: actions.loginUrl,
        method: 'POST',
        data,
      },
    },
  });

/**
 * @method clearAuthDetail : Action for clear state of auth reducer.
 */
export const clearAuthDetail = () =>
  action({
    type: actions.CLEAR_AUTH,
  });
