import Moment from 'moment';
import { BENEFICIARY_TYPE_LIST, WALLET_LIST, deviceHeight, deviceWidth } from '../common/constants';

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

/**
 *
 * @param {string} str : String value whose first character is to be returned.
 */
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
 * @param {object} typeUuid : User wallet account's type.
 */
export function getWalletType(accountTypeList, typeUuid) {
  let walletType = '';
  if (accountTypeList && accountTypeList.length > 0) {
    const accTypeLen = accountTypeList.length;
    for (let i = 0; i < accTypeLen; i += 1) {
      if (accountTypeList[i].uuid === typeUuid) {
        walletType = accountTypeList[i].symbol ? accountTypeList[i].symbol : '-';
      }
    }
  }
  return walletType;
}

/**
 *
 * @param {Array} userWalletDetail : List of user wallet accounts.
 * @param {object} accountId : User wallet account's id.
 */
export function getWalletDetail(userWalletDetail, accountId) {
  let name = '';
  let balance = '';
  let type = '';
  if (userWalletDetail && userWalletDetail.length > 0) {
    const accTypeLen = userWalletDetail.length;
    for (let i = 0; i < accTypeLen; i += 1) {
      if (userWalletDetail[i].uuid === accountId) {
        name = userWalletDetail[i].description ? userWalletDetail[i].description : '--';
        balance = userWalletDetail[i].balance ? userWalletDetail[i].balance : '--';
        type = userWalletDetail[i].type_uuid ? userWalletDetail[i].type_uuid : '--';
      }
    }
  }
  return { name, balance, type };
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

/**
 * @param {string} email : Value to be tested for validity.
 */
export function isEmailValid(email) {
  if (email && email !== '') {
    const reg = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2}\w+)+$/; //eslint-disable-line
    if (reg.test(email) === false) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 * @param {string} expiryTime : Time value to be tested for session expiry ( expiryTime is timestamp ).
 */
export function isSessionExpires(expiryTime) {
  if (expiryTime && expiryTime !== '' && expiryTime !== undefined) {
    const currentTime = Moment(new Date(), 'DD.MM.YYYY')
      .toDate()
      .getTime();
    if (expiryTime >= currentTime) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * @param {string} passwordVal : Password value to be checked.
 * @param {CallableFunction} updateState : Callback method to update state of password validity.
 */
export function isPasswordValid(passwordVal, updateState) {
  const regOneCapital = /^(?=.*[A-Z]).{1,}$/;
  const regOneLower = /^(?=.*[a-z]).{1,}$/;
  const regOneNumber = /^(?=.*\d).{1,}$/;

  if (passwordVal !== '') {
    if (passwordVal.length >= 8) {
      updateState('eightPlusCharacter', true);
    } else {
      updateState('eightPlusCharacter', false);
    }

    if (regOneCapital.test(passwordVal)) {
      updateState('moreThanOneCapital', true);
    } else {
      updateState('moreThanOneCapital', false);
    }

    if (regOneLower.test(passwordVal)) {
      updateState('moreThanOneLower', true);
    } else {
      updateState('moreThanOneLower', false);
    }

    if (regOneNumber.test(passwordVal)) {
      updateState('moreThanOneNumber', true);
    } else {
      updateState('moreThanOneNumber', false);
    }
  } else {
    // if password length is 0
    updateState('moreThanOneNumber', false);
    updateState('moreThanOneLower', false);
    updateState('moreThanOneCapital', false);
    updateState('eightPlusCharacter', false);
  }
}

/**
 * @method getAccountIcon : To create account icon text.
 * @param {object} userDetail : Object of user's detail.
 */
export function getAccountIcon(userDetail) {
  let userIcon = '--';
  if (userDetail && userDetail !== null && userDetail !== undefined) {
    if (
      userDetail.firstname &&
      userDetail.firstname !== null &&
      userDetail.firstname !== undefined
    ) {
      userIcon = getFirstCharOfString(userDetail.firstname);
    }
    if (userDetail.surname && userDetail.surname !== null && userDetail.surname !== undefined) {
      if (userIcon !== '--') {
        userIcon = `${userIcon}${getFirstCharOfString(userDetail.surname)}`;
      } else {
        userIcon = getFirstCharOfString(userDetail.surname);
      }
    }
  }

  return userIcon;
}

export function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * @method getFullName : To get full name of user.
 * @param {object} userDetail : Object of user's detail.
 */
export function getFullName(userDetail) {
  let fullName = '--';
  if (userDetail && userDetail !== null && userDetail !== undefined) {
    if (
      userDetail.firstname &&
      userDetail.firstname !== null &&
      userDetail.firstname !== undefined
    ) {
      fullName = userDetail.firstname;
    }
    if (userDetail.surname && userDetail.surname !== null && userDetail.surname !== undefined) {
      if (fullName !== '--') {
        fullName = `${fullName} ${userDetail.surname}`;
      } else {
        fullName = userDetail.surname;
      }
    }
  }
  fullName = titleCase(fullName);
  return fullName;
}

export function isIPhoneX() {
  if (deviceHeight === 812 && deviceWidth === 375) {
    return true;
  }
  return false;
}

export function formatDate(date) {
  const formattedDate = Moment(date).format('DD/MM/YYYY');
  return formattedDate;
}

export function formatTime(time) {
  const formattedTime = Moment(time).format('hh:mm:ss a');
  return formattedTime;
}
