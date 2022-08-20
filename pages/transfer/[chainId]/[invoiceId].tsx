import { Box } from '@mui/material';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import InvoiceTransferView from '../../../components/InvoiceTransferView';
import { useGetInvoice } from '../../../hooks';
import { Invoice, NonPromisifiedInvoiceStruct } from '../../../models';
import { resetTransferInvoice } from '../../../store/transferInvoice/actions';
import { loadInvoice } from '../../../utils';

interface InvoiceTransferPageProps {
  invoice?: NonPromisifiedInvoiceStruct;
  invoiceId: string;
}

const InvoiceTransferPage: NextPage<InvoiceTransferPageProps> = ({
  invoice: preloadedInvoiceJson,
  invoiceId,
}) => {
  const preloadedInvoice = useMemo(
    () =>
      preloadedInvoiceJson ? Invoice.fromJson(preloadedInvoiceJson) : undefined,
    [preloadedInvoiceJson],
  );
  const { data: freshInvoice } = useGetInvoice(invoiceId, { watch: true });
  const invoice = useMemo(
    () => freshInvoice || preloadedInvoice,
    [freshInvoice, preloadedInvoice],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTransferInvoice());
  }, [dispatch]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      {invoice && <InvoiceTransferView invoice={invoice} />}
      <Footer />
    </Box>
  );
};

export async function getServerSideProps(
  ctx: NextPageContext,
): Promise<{ props: InvoiceTransferPageProps }> {
  const invoiceId = ctx.query.invoiceId as string;
  const chainId = Number(ctx.query.chainId as string);

  const invoice = await loadInvoice(invoiceId, chainId);

  return {
    props: {
      invoice: invoice.toJson(),
      invoiceId,
    },
  };
}

export default InvoiceTransferPage;
