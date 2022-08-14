import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

import style from './InvoicePage.module.scss';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import InvoiceView from '../../../components/InvoiceView';
import { useGetInvoice } from '../../../hooks';

export interface InvoicePageProps {
  invoiceId: string;
}

const InvoicePage: NextPage<InvoicePageProps> = ({ invoiceId }) => {
  const { data: invoice } = useGetInvoice(invoiceId, { watch: true });

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      className={style.InvoicePage}
    >
      <Header />
      {invoice && <InvoiceView invoice={invoice} />}
      <Footer />
    </Box>
  );
};

InvoicePage.getInitialProps = async (ctx) => {
  return {
    invoiceId: ctx.query.invoiceId as string,
  };
};

export default InvoicePage;
