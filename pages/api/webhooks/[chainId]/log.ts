import { TransferSafeRouter__factory } from '@transfer-safe/router';
import { BigNumber } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

import { handleLogEvent } from '../../../../utils/webhooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const chainId = BigNumber.from(req.query.chainId).toNumber();
  const router = TransferSafeRouter__factory.createInterface();
  const log = router.parseLog(req.body);
  const txId = req.body.transaction_hash;
  try {
    await handleLogEvent(log, chainId, txId);
    res.status(200).send(undefined);
  } catch (err) {
    res.status(500).send(undefined);
    throw err;
  }
}
