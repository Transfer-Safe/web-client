import { BigNumber } from 'ethers';
import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useDepositInvoice = (
  invoiceId: string,
  instant: boolean,
  amount?: BigNumber,
) => {
  const { config } = useWriteRouterFunction('deposit', [invoiceId, instant], {
    overrides: {
      value: amount,
    },
  });
  return useContractWrite(config);
};
