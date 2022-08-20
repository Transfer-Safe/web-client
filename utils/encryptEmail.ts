import CryptoJS from 'crypto-js';

const secret = process.env.EMAIL_SECRET || '';

export const encryptEmail = (email: string): string => {
  console.log('Encrypt email. Secret: ', secret);
  console.log('Encrypt email. Email: ', email);
  const result = CryptoJS.AES.encrypt(email, secret).toString();
  console.log('Encrypt email. Encrypted email: ', result);
  return result;
};

export const dencryptEmail = (email: string): string => {
  console.log('Decrypt email. Secret: ', secret);
  console.log('Decrypt email. Email: ', email);
  const result = CryptoJS.AES.decrypt(email, secret).toString(
    CryptoJS.enc.Utf8,
  );
  console.log('Decrypt email. Decrypted email: ', result);
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
