import CryptoJS from 'crypto-js';

const secret = process.env.EMAIL_SECRET || '';

export const encryptEmail = (email: string): string =>
  CryptoJS.AES.encrypt(email, secret).toString();

export const dencryptEmail = (email: string): string =>
  CryptoJS.AES.decrypt(email, secret).toString(CryptoJS.enc.Utf8);
