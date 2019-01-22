import { Dimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

/* ListCard constants */
export const WALLET_LIST = 'WALLET_LIST';
export const ACCOUNT_TYPE_LIST = 'ACCOUNT_TYPE_LIST';
export const BENEFICIARY_TYPE_LIST = 'BENEFICIARY_TYPE_LIST';

/* Icon Types */
export const MaterialIconsType = 'MaterialIconsType';
export const MaterialCommunityIconsType = 'MaterialCommunityIconsType';
export const ImageIconType = 'ImageIconType';
export const EvilIconsType = 'EvilIconsType';

/* Validation status types */
export const invalid = 'invalid';
export const valid = 'valid';

/* Validation alert text */
export const invalidEmail = `Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '.'`;
export const invalidPassword = `Password does not match given constraints. Valid password can contain atleast 8 characters including 1 uppercase letter, 1 lowercase letter and 1 number.`;
export const invalidConfirmPassword = `Password does not matched.`;
export const invalidAccNumber = `Please enter valid account number.`;
export const invalidBeneficiaryName = `Beneficiary name already exists.`;
export const invalidAmount = `Amount field should be number.`;
export const insufficientBalance = `Insufficient wallet balance.`;
export const invalidAccountName = `Wallet name already exists.`;
export const noWalletAccount = 'You must have, atleast one account to pay to beneficiary.';
