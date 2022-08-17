import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  useTheme,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useMemo } from 'react';

type InvoiceTimelineCardProps = BoxProps & {
  title: string;
  timestamp?: Date;
  subtitle?: string;
  active?: boolean;
  completed?: boolean;
  nextCompleted?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
};

export const InvoiceTimelineCard: React.FC<InvoiceTimelineCardProps> = ({
  title,
  timestamp,
  subtitle,
  active,
  completed,
  nextCompleted,
  isFirst,
  isLast,
  ...props
}) => {
  const theme = useTheme();
  const spanColor = useMemo(
    () => (completed ? theme.palette.primary.main : theme.palette.grey[300]),
    [theme, completed],
  );
  const nextSpanColor = useMemo(
    () =>
      nextCompleted ? theme.palette.primary.main : theme.palette.grey[300],
    [theme, nextCompleted],
  );
  const spanWidth = useMemo(() => 2, []);
  const spanCircleRadius = useMemo(() => (active ? 32 : 16), [active]);
  const typoVariant: TypographyProps['variant'] = active ? 'body1' : 'body2';

  const textColor = useMemo(
    () => (completed ? undefined : theme.palette.grey[500]),
    [completed, theme],
  );

  const timestampFontSize = useMemo(
    () => (active ? '1rem' : '0.75rem'),
    [active],
  );

  return (
    <Box display="flex" {...props}>
      <Box
        width="80px"
        display={{
          xs: 'none',
          md: 'flex',
        }}
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-end"
        mr={3}
        flexShrink={0}
      >
        {timestamp && (
          <React.Fragment>
            <Typography
              color={theme.palette.grey[600]}
              fontSize={timestampFontSize}
              textAlign="right"
            >
              {timestamp.toLocaleDateString()}
            </Typography>
            <Typography
              color={theme.palette.grey[600]}
              variant="caption"
              fontSize={timestampFontSize}
              textAlign="right"
            >
              {timestamp.toLocaleTimeString()}
            </Typography>
          </React.Fragment>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mr={3}
        width="45px"
        flexShrink={0}
      >
        <Box
          flex={1}
          width={`${spanWidth}px`}
          bgcolor={isFirst ? 'transparent' : spanColor}
          component="div"
        />
        <Box
          width={`${spanCircleRadius}px`}
          height={`${spanCircleRadius}px`}
          borderRadius={`${spanCircleRadius}px`}
          bgcolor={spanColor}
          component="div"
          my="-4px"
          sx={{
            zIndex: 2,
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {active && (
            <CheckIcon
              sx={{
                color: 'white',
                width: spanCircleRadius - 6,
                height: spanCircleRadius - 6,
              }}
            />
          )}
        </Box>
        <Box
          flex={1}
          width={`${spanWidth}px`}
          bgcolor={isLast ? 'transparent' : nextSpanColor}
          component="div"
        />
      </Box>
      <Box py={2}>
        <Typography color={textColor} variant={typoVariant} fontWeight="500">
          {title}
        </Typography>
        {subtitle && (
          <Typography color={textColor} variant={typoVariant}>
            {subtitle}
          </Typography>
        )}
        {timestamp && (
          <Typography
            fontSize={timestampFontSize}
            color={theme.palette.grey[500]}
            sx={{
              display: {
                md: 'none',
              },
            }}
          >
            {timestamp.toLocaleString()}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
