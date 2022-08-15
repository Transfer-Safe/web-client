import Head from 'next/head';
import { useMemo } from 'react';

import { Invoice } from '../models';
import { createOgImageUrl, formatNumber } from '../utils';

interface InvoiceHeadTagsProps {
  invoice: Invoice;
}

const InvoiceHeadTags: React.FC<InvoiceHeadTagsProps> = ({ invoice }) => {
  const formattedAmount = useMemo(
    () => formatNumber(invoice.amount) + '$',
    [invoice.amount],
  );
  const title = useMemo(() => {
    let title = 'Transfer request';
    if (invoice.ref) {
      title += ' for ' + invoice.ref;
    }
    return title;
  }, [invoice.ref]);

  const docTitle = [formattedAmount, title, '—', 'TransferSafe'].join(' ');

  return (
    <Head>
      <title>{docTitle}</title>
      <meta
        property="og:image"
        content={createOgImageUrl(formattedAmount, title)}
      />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:title" content={docTitle} />
      <meta
        property="og:description"
        content="Transfer your funds safely with TransferSafe"
      />
    </Head>
  );
};
export default InvoiceHeadTags;
