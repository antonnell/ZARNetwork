/* eslint-disable no-console */
import crypto from 'react-native-crypto';

const sha256 = require('sha256');

const hexDecode = data => {
  let j;
  const hexes = data.match(/.{1,4}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j += 1) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
};

export const decrypt = (text, seed) => {
  const decipher = crypto.createDecipher('aes-256-cbc', seed);
  let dec = decipher.update(text, 'base64', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

export const fullDecrypt = d => {
  const dMnemonic = hexDecode(d.m);
  const dEncrypted = hexDecode(d.e);
  // eslint-disable-next-line no-unused-vars
  const dTime = d.t;
  const dSignature = d.s;
  const sig = {
    e: d.e,
    m: d.m,
    t: d.t,
  };
  const dSeed = JSON.stringify(sig);
  const compareSignature = sha256(dSeed);

  // eslint-disable-next-line no-empty
  if (compareSignature !== dSignature) {
  }
  const payload = decrypt(dEncrypted, dMnemonic);
  let unencrypted = null;
  try {
    unencrypted = JSON.parse(payload);
    // eslint-disable-next-line no-empty
  } catch (ex) {}
  return unencrypted;
};

export const decryptPayload = encryptedPayload => {
  console.log('encryptedPayload : ', encryptedPayload);

  const dMnemonic = hexDecode(encryptedPayload.m);
  console.log('dMnemonic : ', dMnemonic);

  const dEncrypted = hexDecode(encryptedPayload.e);
  console.log('dEncrypted : ', dEncrypted);

  const dTime = encryptedPayload.t;
  console.log('dTime : ', dTime);

  const dSignature = encryptedPayload.s;
  console.log('dSignature : ', dSignature);

  const sig = {
    e: encryptedPayload.e,
    m: encryptedPayload.m,
    t: encryptedPayload.t,
  };

  console.log('sig : ', sig);

  const dSeed = JSON.stringify(sig);
  console.log('dSeed : ', dSeed);

  const compareSignature = sha256(dSeed);
  console.log('compareSignature : ', compareSignature);

  // if (compareSignature !== dSignature) {
  //   return { status: 'Data corrupted' };
  // }
  const payload = decrypt(dEncrypted, dMnemonic);
  let unencrypted = null;
  try {
    unencrypted = JSON.parse(payload);
    console.log('unencrypted : ', unencrypted);
    return { status: 'success', payload: unencrypted };
  } catch (ex) {
    return { status: 'failure' };
  }
};
