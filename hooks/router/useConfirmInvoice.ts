import { BigNumber } from 'ethers';
import { useState } from 'react';
import { useContractWrite } from 'wagmi';

import { useWriteRouterFunction } from './useRouterFunction';

export const useConfirmInvoice = (invoiceId: string) => {
  const [gasLimit, setGasLimit] = useState<BigNumber | undefined>();
  const { config } = useWriteRouterFunction('confirmInvoice', [invoiceId], {
    overrides: {
      gasLimit,
    },
    onError(err) {
      if (err.message.includes('UNPREDICTABLE_GAS_LIMIT')) {
        setGasLimit(BigNumber.from('0x01c385').mul(3));
      }
    },
  });

  return useContractWrite(config);
};
