import { Box } from '@mui/material';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import InvoiceTransferView from '../../../components/InvoiceTransferView';
import { useGetInvoice } from '../../../hooks';
import { resetTransferInvoice } from '../../../store/transferInvoice/actions';

interface InvoiceTransferPageProps {
  invoiceId: string;
}

const InvoiceTransferPage: NextPage<InvoiceTransferPageProps> = ({
  invoiceId,
}) => {
  const { data: invoice } = useGetInvoice(invoiceId, { watch: true });
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

InvoiceTransferPage.getInitialProps = async (ctx) => {
  return {
    invoiceId: ctx.query.invoiceId as string,
  };
};

export default InvoiceTransferPage;
