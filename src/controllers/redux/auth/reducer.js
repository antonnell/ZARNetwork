import { REGISTER, LOGIN, _SUCCESS, CLEAR_AUTH, UPDATE_USER_PROFILE } from '../base/constants';

const sha256 = require('sha256');

const defaultState = {
  userDetail: null,
};

/**
 * @method getFormattedAuthData : To format result of authentication api (register and login).
 */

const getFormattedAuthData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.result) {
        const userAuthData = data.result;
        if (userAuthData) {
          if (userAuthData) {
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
            } = userAuthData;

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
              const xKey = sha256(userAuthData.email);
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

const clearState = state => Object.assign({}, state, { userDetail: null });

const updateAuthState = (state, action) => {
  if (action && action.payload && action.payload.config && action.payload.config.data) {
    const data = JSON.parse(action.payload.config.data);

    const { firstname, email, surname } = data;
    const updatedState = {
      ...state.userDetail,
      firstname,
      surname,
      email,
    };

    return Object.assign({}, state, {
      userDetail: updatedState,
    });
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
    case `${CLEAR_AUTH}`: {
      const formattedData = clearState(state);
      return formattedData;
    }

    case `${UPDATE_USER_PROFILE}${_SUCCESS}`: {
      const formattedData = updateAuthState(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userAuthReducer;
