/* eslint-disable no-underscore-dangle */
/**
 * Reducer constants :-
 */
export const GET_FANTOM_BALANCE = 'GET_FANTOM_BALANCE';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';

// For type api.
export const SUPPORTED_ACCOUNT_TYPE = 'SUPPORTED_ACCOUNT_TYPE';

// For status type api.
export const STATUS_TYPE = 'STATUS_TYPE';

// For accounts api.
export const CREATE_WALLET = 'CREATE_WALLET';
export const WALLET_DETAIL = 'WALLET_DETAIL';
export const WALLET_DETAIL_BY_TYPE = 'WALLET_DETAIL_BY_TYPE';
export const WALLET_DETAIL_BY_ACC_ID = 'WALLET_DETAIL_BY_ACC_ID';

// For Beneficiary api.
export const CREATE_BENEFICIARY = 'CREATE_BENEFICIARY';
export const BENEFICIARY_DETAIL = 'BENEFICIARY_DETAIL';
export const BENEFICIARY_DETAIL_BY_ACC = 'BENEFICIARY_DETAIL_BY_ACC';
export const BENEFICIARY_DETAIL_BY_UUID = 'BENEFICIARY_DETAIL_BY_UUID';

// For transactions api.
export const TRANSACTION_DETAIL = 'TRANSACTION_DETAIL';
export const TRANSACTION_DETAIL_BY_TXN_ID = 'TRANSACTION_DETAIL_BY_TXN_ID';
export const TRANSACTION_DETAIL_BY_ACC_ID = 'TRANSACTION_DETAIL_BY_ACC_ID';

// For requests api.
export const CREATE_PAY_REQUEST = 'CREATE_PAY_REQUEST';
export const PAY_REQUEST_DETAIL = 'PAY_REQUEST_DETAIL';
export const PAY_REQUEST_BY_ID = 'PAY_REQUEST_BY_ID';
export const PAY_REQUEST_BY_ACC_ID = 'PAY_REQUEST_BY_ACC_ID';
export const UPDATE_PAY_REQUEST = 'UPDATE_PAY_REQUEST';
export const DELETE_PAY_REQUEST = 'DELETE_PAY_REQUEST';
export const CREATE_MERCHANT_PAY_REQUEST = 'CREATE_MERCHANT_PAY_REQUEST';
export const GET_MERCHANT_PAY_REQUEST = 'GET_MERCHANT_PAY_REQUEST';

// For api's status.
export const _SUCCESS = '_SUCCESS';
export const _FAIL = '_FAIL';

/**
 * Types for encryption :-
 */
export const REGISTER_TYPE = 'register';
export const LOGIN_TYPE = 'login';
export const WALLET_TYPE = 'accounts';
export const BENEFICIARY_TYPE = 'beneficiaries';
export const REQUEST_TYPE = 'requests';

/**
 * List of api urls.
 */
export const registerUrl = '/v1/register';
export const loginUrl = '/v1/login';
export const supportedAccountTypeUrl = '/v1/types';
export const statusTypeUrl = '/v1/statuses';

export const walletUrl = '/v1/accounts';
export const userTypeWalletUrl = `${walletUrl}/types`;
export const userAccIdWalletUrl = `${walletUrl}`;

export const beneficiaryUrl = '/v1/beneficiaries';
export const userAccountBeneficiaryUrl = `${beneficiaryUrl}/accounts`;
export const uuidBeneficiaryUrl = `${beneficiaryUrl}`;

export const transactionUrl = '/v1/transactions';
export const accUuidTransactionUrl = `${transactionUrl}/accounts`;

export const payRequestsUrl = '/v1/requests';
export const accountPayRequestsUrl = `${payRequestsUrl}/accounts`;
export const uuidPayRequestsUrl = `${payRequestsUrl}`;
export const merchantPayRequestsUrl = '/v0/requests';
