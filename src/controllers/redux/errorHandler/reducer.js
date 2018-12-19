import { REGISTER, LOGIN, _FAIL } from '../base/constants';

const defaultState = {
  status: null,
  message: '',
  loading: false,
};

/**
 * @method getFormattedAuthData : To format result of authentication api's (register and login)
 */
const getFormattedAuthData = action => {
  if (action && action.error && action.error.response) {
    const { data } = action.error.response;
    const { message, status } = data;

    return { message, status, loading: false };
  }
  return {};
};

/**
 * @method errorHandlerReducer : Reducer for handling status of api failing.
 * */
const errorHandlerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${REGISTER}${_FAIL}`: {
      const formattedData = getFormattedAuthData(action);
      return {
        ...state,
        ...formattedData,
      };
    }
    case `${LOGIN}${_FAIL}`: {
      const formattedData = getFormattedAuthData(action);
      return {
        ...state,
        ...formattedData,
      };
    }
    default:
      return state;
  }
};

export default errorHandlerReducer;
