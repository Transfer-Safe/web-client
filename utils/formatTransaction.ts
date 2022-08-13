export const formatTransactionId = (id: string): string => {
  return [id.slice(0, 6), '...', id.slice(id.length - 4, id.length)].join('');
};
