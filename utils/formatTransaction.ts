export const formatTransactionId = (id: string): string => {
  return [id.slice(0, 8), '...', id.slice(id.length - 6, id.length)].join('');
};
