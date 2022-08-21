import { BigNumber } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

import { AlchemyTransactionWebhookBody } from '../../../../models';
import { handleTransactionWebhook } from '../../../../utils/webhooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body as AlchemyTransactionWebhookBody;
  const chainId = BigNumber.from(req.query.chainId).toNumber();
  try {
    for await (const activity of body.event.activity) {
      const transactionId = activity.hash;
      await handleTransactionWebhook(transactionId, chainId);
    }
    res.status(200).send(undefined);
  } catch (err: any) {
    res.status(500).json(err?.message);
  }
}
