export const createOgImageUrl = (amount: string, title: string): string => {
  const url = new URL('https://api.placid.app/u/5sns4vd7q?');
  url.searchParams.set('amount[text]', amount);
  url.searchParams.set('title[text]', title);
  return url.href;
};
