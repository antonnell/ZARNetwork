/* eslint-disable no-console */
import Bip39 from 'react-native-bip39';
import crypto from 'react-native-crypto';

const sha256 = require('sha256');

const hexEncode = data => {
  let hex;
  let i;
  let result = '';
  for (i = 0; i < data.length; i += 1) {
    hex = data.charCodeAt(i).toString(16);
    result += `000${hex}`.slice(-4);
  }
  return result;
};

// eslint-disable-next-line import/prefer-default-export
export const encrypt = (payload, type) => {
  const json = JSON.stringify(payload);
  console.log('json : ', json);

  return new Promise((resolve, reject) => {
    const menmonicPromise = Bip39.generateMnemonic();

    menmonicPromise
      .then(mnemonic => {
        console.log('mnemonic : ', mnemonic);

        const cipher = crypto.createCipher('aes-256-cbc', mnemonic);
        console.log('cipher : ', cipher);

        const encrypted = cipher.update(json, 'utf8', 'base64') + cipher.final('base64');
        console.log('encrypted : ', encrypted);

        const data = {
          e: hexEncode(encrypted),
          m: hexEncode(mnemonic),
          u: sha256(type).toUpperCase(),
          p: sha256(sha256(type).toUpperCase()).toUpperCase(),
          t: new Date().getTime(),
        };
        console.log('data : ', data);

        const seed = JSON.stringify(data);
        console.log('seed : ', seed);

        const signature = sha256(seed);
        console.log('signature : ', signature);

        data.s = signature;
        console.log(' data after encoding : ', data);
        resolve({ status: 'success', data });
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch(error => reject({ status: 'fail', error }));
  });

  // call(null);
};
