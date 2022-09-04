import { TransferSafeRouter__factory } from '@transfer-safe/router';
import { BigNumber } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { handleLogEvent } from '../../../../utils/webhooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const chainId = BigNumber.from(req.query.chainId).toNumber();
  const router = TransferSafeRouter__factory.createInterface();
  let log: LogDescription | undefined;
  try {
    log = router.parseLog(req.body);
  } catch (err) {
    console.error('Failed to parse log', err);
    res.status(500).send(undefined);
  }
  const txId = req.body.transaction_hash;
  try {
    await handleLogEvent(log!, chainId, txId);
    res.status(200).send(undefined);
  } catch (err) {
    res.status(500).send(undefined);
    throw err;
  }
}
