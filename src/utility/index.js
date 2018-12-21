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
