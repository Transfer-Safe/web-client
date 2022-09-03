import { BigNumber } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

import { AlchemyTransactionWebhookBody } from '../../../../models';
import { handleTransactionWebhook } from '../../../../utils/webhooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const transactionIds = new Set<string>();
  const body = req.body as AlchemyTransactionWebhookBody;
  const chainId = BigNumber.from(req.query.chainId).toNumber();
  body.event.activity.forEach((activity) => {
    if (
      activity.category === 'external' ||
      activity.typeTraceAddress.startsWith('CALL_')
    ) {
      transactionIds.add(activity.hash);
    }
  });

  try {
    for await (const transactionId of transactionIds) {
      await handleTransactionWebhook(transactionId, chainId);
    }
    res.status(200).send(undefined);
  } catch (err: any) {
    console.error(err);
    res.status(500).json(err?.message);
  }
}
