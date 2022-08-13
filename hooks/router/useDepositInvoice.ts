import { BigNumber } from 'ethers';
import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useDepositInvoice = (invoiceId: string, amount?: BigNumber) => {
  const { config } = useWriteRouterFunction('deposit', [invoiceId], {
    overrides: {
      value: amount,
    },
  });
  return useContractWrite(config);
};
