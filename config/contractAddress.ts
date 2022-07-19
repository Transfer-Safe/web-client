import { Mumbai } from '@usedapp/core';

export const getContractAddress = (chainId: number): string => {
  switch (chainId) {
    case Mumbai.chainId:
      return '0x9e0B75A2204A2a3a3046B7Ec2929DBF0c97e1fdf';
    default:
      throw new Error(`Unknown chainId: ${chainId}`);
  }
};
