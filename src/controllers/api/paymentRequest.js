import { dispatch } from '../../store';
import {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
  createMerchantRequest,
  getMerchantRequests,
} from '../redux/paymentRequest/action';
import { encrypt } from '../utility/encryption';
import { REQUEST_TYPE } from '../redux/base/constants';

/* ******************************************************************************************* */
/*                                      Payment requests                                       */
/* ******************************************************************************************* */

/**
 * ******************************************************************************
 * @method setNewRequest : Method for api call, to create a new requests for account.
 * @param {object} payload : Payload for creating requests for account.
 * 
 *  payload contains following :-
 *  -> account_uuid {string} : uuid of wallet account.
 *  -> value {number} : amount.
 *  -> beneficiary_uuid {string} : uuid of beneficiary of wallet account.
 * -> my_reference {string}: beneficiary reference
 * ******************************************************************************
 * @method encrypt : To encrypt the payload sent to create requests for account.
 * @param payload : Data to be encrypted.
 * @param REQUEST_TYPE : Data type to be encrypted i.e for requests.
 * ******************************************************************************

 */
export const setNewRequest = payload =>
  new Promise((resolve, reject) => {
    encrypt(payload, REQUEST_TYPE)
      .then(data => {
        if (data.data) {
          dispatch(createRequest(data.data))
            .then(result => resolve(result))
            .catch(err => reject(err));
        } else {
          reject(new Error(data.error));
        }
      })
      .catch(err => reject(err));
  });

/**
 * *******************************************************************************************
 * @method getPayRequestDetail : Method for api call, to get all requests for account of user.
 * @param {object} payload : Payload for updating requests for account.
 *
 *  If request_uuid is passed in payload : Retrieve requests for account for given request_uuid,
 *  else if account_uuid is passed in payload : Retrieve requests for account for given account_uuid,
 *  otherwise retrieve all requests for accounts of user.
 * *******************************************************************************************
 */
export const getPayRequestDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(getRequests(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });

/**
 * *********************************************************************************************
 * @method updatePayRequestDetail : Method for api call, to update requests for account of user.
 * @param {object} payload : Payload for updating requests for account.
 *
 *  payload contains following :-
 *  -> request_uuid {string} : uuid of request to be updated.
 * *********************************************************************************************
 */
export const updatePayRequestDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(updateRequest(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });

/**
 * *********************************************************************************************
 * @method deletePayRequestDetail : Method for api call, to delete requests for account of user.
 * @param {object} payload : Payload for updating requests for account.
 *
 *  payload contains following :-
 *  -> request_uuid {string} : uuid of request to be deleted.
 * *********************************************************************************************
 */
export const deletePayRequestDetail = payload =>
  new Promise((resolve, reject) => {
    dispatch(deleteRequest(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });

/* ******************************************************************************************* */
/*                                  Merchant payment requests                                  */
/* ******************************************************************************************* */

/**
 * ******************************************************************************
 * @method createMerchantPayRequest : Method for api call, to create a new requests for account.
 * @param {object} payload : Payload for creating requests for account.
 * 
 *  payload contains following :-
 *  -> mobile_number {string} : Mobile number of user.
 *  -> value {number} : amount.
 *  -> value_type {string} : Acoount type for value i.e 'FTM', 'ETH', etc.
 *  -> type {string} : Acoount type for value i.e 'FTM', 'ETH', etc.
 *  -> merchant_uuid {string} : Uuid of merchant.
 *  -> reference {string} : 
 * ******************************************************************************
 * @method encrypt : To encrypt the payload sent to create requests for account.
 * @param payload : Data to be encrypted.
 * @param REQUEST_TYPE : Data type to be encrypted i.e for requests.
 * ******************************************************************************

 */
export const createMerchantPayRequest = payload =>
  new Promise((resolve, reject) => {
    encrypt(payload, REQUEST_TYPE)
      .then(data => {
        if (data.data) {
          dispatch(createMerchantRequest(data.data))
            .then(result => resolve(result))
            .catch(err => reject(err));
        } else {
          reject(new Error(data.error));
        }
      })
      .catch(err => reject(err));
  });

/**
 * *******************************************************************************************
 * @method getPayRequestDetail : Method for api call, to get all requests for account of user.
 * @param {object} payload : Payload for updating requests for account.
 *
 *   payload contains following :-
 *  -> request_uuid {string} : Uuid of request.
 * *******************************************************************************************
 */
export const getMerchantPayRequest = payload =>
  new Promise((resolve, reject) => {
    dispatch(getMerchantRequests(payload))
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
