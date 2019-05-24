import action from '../base/action';
import * as actions from '../base/constants';

/* ******************************************************************************************* */
/*                                      Payment requests                                       */
/* ******************************************************************************************* */

/**
 * ******************************************************************************
 * @method createRequest : Action for create new request api.
 * @param {object} data : Data for creating new request.
 * ******************************************************************************
 */
export const createRequest = data =>
  action({
    type: actions.CREATE_PAY_REQUEST,
    payload: {
      request: {
        url: actions.payRequestsUrl,
        method: 'POST',
        data,
        isAuthorised: true,
      },
    },
  });

/**
 * ******************************************************************************
 * @method getRequests : Action for get request api.
 * @param {object} data :  Payload for getting request details.
 * ******************************************************************************
 *  If request_uuid is passed in data : Retrieve requests for account for given request_uuid,
 *  else if account_uuid is passed in data : Retrieve requests for account for given account_uuid,
 *  otherwise retrieve all requests for accounts of user.
 *  ******************************************************************************
 */
export const getRequests = data => {
  const requestUuid = data && data.request_uuid ? data.request_uuid : '';
  const accountUuid = data && data.account_uuid ? data.account_uuid : '';
  let url = actions.payRequestsUrl;
  let actionType = actions.PAY_REQUEST_DETAIL;
  if (requestUuid && requestUuid !== '') {
    url = `${actions.uuidPayRequestsUrl}/${requestUuid}`;
    actionType = actions.PAY_REQUEST_BY_ID;
  }
  if (accountUuid && accountUuid !== '') {
    url = `${actions.accountPayRequestsUrl}/${accountUuid}`;
    actionType = actions.PAY_REQUEST_BY_ACC_ID;
  }
  return action({
    type: actionType,
    payload: {
      request: {
        url,
        method: 'GET',
        isAuthorised: true,
      },
    },
  });
};

/**
 * ******************************************************************************
 * @method updateRequest : Action for update request api.
 * @param {object} data :  Payload for updating request details.
 * ******************************************************************************
 * payload contains following :-
 *  -> request_uuid {string} : uuid of request to be updated.
 *  ******************************************************************************
 */
export const updateRequest = data => {
  const requestUuid = data && data.request_uuid ? data.request_uuid : '';
  return action({
    type: actions.UPDATE_PAY_REQUEST,
    payload: {
      request: {
        url: `${actions.payRequestsUrl}/${requestUuid}`,
        method: 'PUT',
        isAuthorised: true,
        data,
      },
    },
  });
};

/**
 * ******************************************************************************
 * @method deleteRequest : Action for delete request api.
 * @param {object} data :  Payload for deleting request details.
 * ******************************************************************************
 * payload contains following :-
 *  -> request_uuid {string} : uuid of request to be deleted.
 *  ******************************************************************************
 */
export const deleteRequest = data => {
  const requestUuid = data && data.request_uuid ? data.request_uuid : '';
  return action({
    type: actions.DELETE_PAY_REQUEST,
    payload: {
      request: {
        url: `${actions.payRequestsUrl}/${requestUuid}`,
        method: 'DELETE',
        isAuthorised: true,
      },
    },
  });
};

/* ******************************************************************************************* */
/*                                  Merchant payment requests                                  */
/* ******************************************************************************************* */

/**
 * ******************************************************************************
 * @method createMerchantRequest : Action for create new request api.
 * @param {object} data : Data for creating new request.
 * ******************************************************************************
 */
export const createMerchantRequest = data =>
  action({
    type: actions.CREATE_MERCHANT_PAY_REQUEST,
    payload: {
      request: {
        url: actions.merchantPayRequestsUrl,
        method: 'POST',
        data,
        isAuthorised: true,
      },
    },
  });

/**
 * ******************************************************************************
 * @method getMerchantRequests : Action for get request api.
 * @param {object} data :  Payload for getting request details.
 * ******************************************************************************
 *   data contains following :-
 *  -> request_uuid {string} : Uuid of request.
 *  ******************************************************************************
 */
export const getMerchantRequests = data => {
  const requestUuid = data && data.request_uuid ? data.request_uuid : '';

  return action({
    type: actions.GET_MERCHANT_PAY_REQUEST,
    payload: {
      request: {
        url: `${actions.merchantPayRequestsUrl}/${requestUuid}`,
        method: 'GET',
        isAuthorised: true,
      },
    },
  });
};
