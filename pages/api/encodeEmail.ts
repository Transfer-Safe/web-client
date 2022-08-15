// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { dencryptEmail, encryptEmail } from '../../utils';

type Body = {
  email: string;
};

type Data = {
  encodedEmail: string;
  decodedEmail: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body as Body;
  const encodedEmail = encryptEmail(body.email);
  const decodedEmail = dencryptEmail(encodedEmail);

  res.status(200).json({ encodedEmail, decodedEmail });
}
