import { Box } from '@mui/material';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import style from './InvoicePage.module.scss';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import InvoiceView from '../../../components/InvoiceView';
import { useGetInvoice } from '../../../hooks';
import { dencryptEmail, loadInvoice } from '../../../utils';

export interface InvoicePageProps {
  invoiceId: string;
  encodedEmail: string | null;
}

const InvoicePage: NextPage<InvoicePageProps> = ({
  invoiceId,
  encodedEmail,
}) => {
  const { data: invoice } = useGetInvoice(invoiceId, { watch: true });

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      className={style.InvoicePage}
    >
      <Header />
      {invoice && (
        <InvoiceView
          encodedEmail={encodedEmail || undefined}
          invoice={invoice}
        />
      )}
      <Footer />
    </Box>
  );
};

export async function getServerSideProps(
  ctx: NextPageContext,
): Promise<{ props: InvoicePageProps }> {
  const invoiceId = ctx.query.invoiceId as string;
  const chainId = Number(ctx.query.chainId as string);

  const invoice = await loadInvoice(invoiceId, chainId);
  console.log('===> invoice', invoiceId, invoice);
  const email =
    invoice.receipientEmail.length > 0
      ? dencryptEmail(invoice.receipientEmail)
      : undefined;

  return {
    props: {
      invoiceId,
      encodedEmail: email || null,
    },
  };
}

export default InvoicePage;
