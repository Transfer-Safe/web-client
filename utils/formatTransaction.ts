export const formatTransactionId = (id: string): string => {
  return [id.slice(0, 14), '...'].join('');
};
