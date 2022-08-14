import { Box, Container, ContainerProps } from '@mui/material';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import InvoiceFormDetails from './InvoiceFormDetails';
import vr from './vr.svg';

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
        alignItems: 'center',
      }}
      {...props}
    >
      <Box sx={{ flex: '1' }}>{children}</Box>
      {withDetails && (
        <React.Fragment>
          <Box marginX={6}>
            <Image src={vr} alt="-" height={400} width={23} />
          </Box>
          <InvoiceFormDetails />
        </React.Fragment>
      )}
    </Container>
  );
};

export default StepContainer;
