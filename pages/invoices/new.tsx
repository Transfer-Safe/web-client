import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback } from 'react';

import style from './new.module.scss';

import Header from '../../components/Header';
import InvoiceForm from '../../components/InvoiceForm';

const NewInvoicePage: NextPage = () => {
  const onSubmitInvoice = useCallback(() => undefined, []);

  return (
    <div className={style.NewInvoicePage}>
      <Head>
        <title>Create new invoice — TransferSafe</title>
      </Head>
      <Header />
      <InvoiceForm
        className={style.container}
        loading={false}
        onSubmitInvoice={onSubmitInvoice}
      />
    </div>
  );
};

export default NewInvoicePage;
