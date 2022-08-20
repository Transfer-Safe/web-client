import CryptoJS from 'crypto-js';

const secret = process.env.EMAIL_SECRET || '';

export const encryptEmail = (email: string): string => {
  const result = CryptoJS.AES.encrypt(email, secret).toString();
  return result;
};

export const dencryptEmail = (email: string): string => {
  const result = CryptoJS.AES.decrypt(email, secret).toString(
    CryptoJS.enc.Utf8,
  );
  return result;
};

export const encryptEmailClient = async (email: string): Promise<string> => {
  const res = await fetch('/api/encryptEmail', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { encryptedEmail } = await res.json();
  return encryptedEmail;
};
