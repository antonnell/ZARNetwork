/* eslint-disable no-underscore-dangle */
/**
 * reducer constants
 */
export const GET_FANTOM_BALANCE = 'GET_FANTOM_BALANCE';
export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const SUPPORTED_ACCOUNT_TYPE = 'SUPPORTED_ACCOUNT_TYPE';
export const STATUS_TYPE = 'STATUS_TYPE';
export const CREATE_WALLET = 'CREATE_WALLET';
export const WALLET_DETAIL = 'WALLET_DETAIL';
export const WALLET_DETAIL_BY_TYPE = 'WALLET_DETAIL_BY_TYPE';
export const WALLET_DETAIL_BY_ACC_ID = 'WALLET_DETAIL_BY_ACC_ID';
export const _SUCCESS = '_SUCCESS';
export const _FAIL = '_FAIL';

/**
 * Types for encryption
 */
export const REGISTER_TYPE = 'register';
export const LOGIN_TYPE = 'login';
export const WALLET_TYPE = 'accounts';

/**
 * List of api urls.
 */
export const registerUrl = '/v0/register';
export const loginUrl = '/v0/login';
export const supportedAccountTypeUrl = '/v1/types';
export const statusTypeUrl = '/v1/statuses';
export const walletUrl = '/v1/accounts';
export const userTypeWalletUrl = `${walletUrl}/types`;
export const userAccIdWalletUrl = `${walletUrl}`;
