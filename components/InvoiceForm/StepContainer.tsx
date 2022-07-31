import { Box, Container, ContainerProps } from '@mui/material';
import classNames from 'classnames';

import InvoiceFormDetails from './InvoiceFormDetails';

type StepContainerProps = ContainerProps & {
  withDetails: boolean;
};

const StepContainer: React.FC<StepContainerProps> = ({
  withDetails,
  className,
  children,
  ...props
}) => {
  return (
    <Container
      maxWidth={withDetails ? 'lg' : 'sm'}
      className={classNames(className)}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
      }}
      {...props}
    >
      <Box sx={{ flex: '1' }}>{children}</Box>
      {withDetails && <InvoiceFormDetails />}
    </Container>
  );
};

export default StepContainer;
