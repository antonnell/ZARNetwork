import { BENEFICIARY_TYPE_LIST, WALLET_LIST } from '../common/constants';
/* eslint-disable import/prefer-default-export */

export function checkPinLength(isClicked, confirmPinCode, pinCode) {
  const colorData = {
    firstDot: 'black',
    secondDot: 'black',
    thirdDot: 'black',
    fourthDot: 'black',
  };
  if (!isClicked && confirmPinCode === '') {
    if (pinCode.length === 1) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'black';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    } else if (pinCode.length === 2) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    } else if (pinCode.length === 3) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'rgb(40,190,253)';
      colorData.fourthDot = 'black';
    } else if (pinCode.length === 4) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'rgb(40,190,253)';
      colorData.fourthDot = 'rgb(40,190,253)';
    } else {
      colorData.firstDot = 'black';
      colorData.secondDot = 'black';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (confirmPinCode.length === 1) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'black';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    } else if (confirmPinCode.length === 2) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    } else if (confirmPinCode.length === 3) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'rgb(40,190,253)';
      colorData.fourthDot = 'black';
    } else if (confirmPinCode.length === 4) {
      colorData.firstDot = 'rgb(40,190,253)';
      colorData.secondDot = 'rgb(40,190,253)';
      colorData.thirdDot = 'rgb(40,190,253)';
      colorData.fourthDot = 'rgb(40,190,253)';
    } else {
      colorData.firstDot = 'black';
      colorData.secondDot = 'black';
      colorData.thirdDot = 'black';
      colorData.fourthDot = 'black';
    }
  }
  return colorData;
}

export function getFirstCharOfString(str) {
  let char = '--';
  if (str.length > 0) {
    char = str.charAt(0).toUpperCase();
  }
  return char;
}

/**
 *
 * @param {Array} accountTypeList : List of supported account types.
 * @param {object} account : User's wallet account.
 */
export function getWalletType(accountTypeList, account) {
  let walletType = '';
  if (accountTypeList && accountTypeList.length > 0) {
    const accTypeLen = accountTypeList.length;
    for (let i = 0; i < accTypeLen; i += 1) {
      if (accountTypeList[i].uuid === account.type_uuid) {
        walletType = accountTypeList[i].symbol ? accountTypeList[i].symbol : '-';
      }
    }
  }
  return walletType;
}

/**
 *
 * @param {Array} availableList : List of available items.
 * @param {string} name : value to be compared.
 * @param {string} listType: Type of List
 */
export function isValidName(availableList, name, listType) {
  const availableListLen = availableList.length;

  if (listType === BENEFICIARY_TYPE_LIST) {
    for (let index = 0; index < availableListLen; index += 1) {
      if (availableList[index].name === name) {
        return false;
      }
    }
  } else if (listType === WALLET_LIST) {
    for (let index = 0; index < availableListLen; index += 1) {
      if (availableList[index].description === name) {
        return false;
      }
    }
  }
  return true;
}
