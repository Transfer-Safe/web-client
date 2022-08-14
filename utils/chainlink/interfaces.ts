import { BigNumber } from 'ethers';

import aggregatorV3InterfaceABI from './aggregatorV3InterfaceABI.json';

export { aggregatorV3InterfaceABI };

export interface AggregatorV3InterfaceResponse {
  roundId: BigNumber;
  answer: BigNumber;
  startedAt: BigNumber;
  updatedAt: BigNumber;
  answeredInRound: BigNumber;
}
