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
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        flex: '1',
        alignItems: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          flex: { md: 1 },
          minHeight: { xs: '60vh', md: 'inherit' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: {
            xs: 'center',
            md: 'inherit',
          },
          paddingY: {
            xs: 4,
            md: 0,
          },
        }}
      >
        {children}
      </Box>
      {withDetails && (
        <React.Fragment>
          <Box
            marginX={6}
            display={{
              xs: 'none',
              md: 'inherit',
            }}
          >
            <Image src={vr} alt="-" height={400} width={23} />
          </Box>
          <InvoiceFormDetails
            mt={{
              xs: 4,
              md: 0,
            }}
            width={{ xs: '100%', md: '380px' }}
          />
        </React.Fragment>
      )}
    </Container>
  );
};

export default StepContainer;
