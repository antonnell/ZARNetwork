import { getStore } from '../../../store/index';

/**
 * @method getHeaderData : Header formatting for Api Request.
 *  -> isAuthorised : False for login api and register api , true for all other apis.
 */
function getHeaderData(definition) {
  const isAuthorised =
    definition &&
    definition.payload &&
    definition.payload.request &&
    definition.payload.request.isAuthorised
      ? definition.payload.request.isAuthorised
      : false;
  let xAccessToken = 'xaccesstoken';
  let xKey = 'xkey';

  if (isAuthorised) {
    const store = getStore();
    const state = store.getState();
    xAccessToken =
      state.userAuthReducer && state.userAuthReducer.xAccessToken
        ? state.userAuthReducer.xAccessToken
        : 'xaccesstoken';
    xKey =
      state.userAuthReducer && state.userAuthReducer.xKey ? state.userAuthReducer.xKey : 'xkey';
  }

  const header = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic QzI0QjY3MzI4RjYyQ0U2OTNDOTk4NURCRUZCRjc4MkFDN0U4RTAyQ0Y0NDBCN0FDOEMxQjA1NTc5NjQ2NEQzODoxNkFBQTQ1MjRFMTAyQURFMEFDMUY4OURCRDlDOEEzMjA4OUI2ODk0MzcwMjhBOUNCMkM1RTgyNUJDQzEzMDFF',
    'x-key': xKey,
    'x-access-token': xAccessToken,
  };

  return header;
}

const action = definition => {
  const data = {
    ...definition,
  };
  if (data && data.payload && data.payload.request) {
    const header = data.payload.request.headers || {};
    const basicHeader = getHeaderData(definition);
    const updatedHeader = {
      ...basicHeader,
      ...header,
    };

    data.payload.request.headers = updatedHeader;
  }
  return data;
};

export default action;
