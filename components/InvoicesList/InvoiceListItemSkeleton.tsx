import { Skeleton } from '@mui/material';

const InvoiceListItemSkeleton: React.FC = () => {
  return (
    <Skeleton variant="rectangular" width="100%" height={140} sx={{ mt: 4 }} />
  );
};

export default InvoiceListItemSkeleton;
