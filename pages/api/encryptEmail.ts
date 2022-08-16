// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { encryptEmail } from '../../utils';

type Body = {
  email: string;
};

type Data = {
  encryptedEmail: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body as Body;
  const encryptedEmail = encryptEmail(body.email);

  res.status(200).json({ encryptedEmail: encryptedEmail });
}
