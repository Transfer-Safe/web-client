import { BigNumber } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

import { getRouterContractAddress } from '../../../config';
import { linkToAddress } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const chainId = BigNumber.from(req.query.chainId).toNumber();
  const contractAddress = getRouterContractAddress(chainId);
  const contractLink = linkToAddress(contractAddress, chainId);
  if (contractLink) {
    return res.redirect(307, contractLink);
  }
  return res.status(404).send(undefined);
}
