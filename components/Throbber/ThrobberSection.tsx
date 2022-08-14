import { Box, Typography, BoxProps } from '@mui/material';
import classNames from 'classnames';
import { ReactNode } from 'react';

import Throbber from './Throbber';
import style from './ThrobberSection.module.scss';

import { theme } from '../../config';

type ThrobberSectionProps = BoxProps & {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
};

const ThrobberSection: React.FC<ThrobberSectionProps> = ({
  title,
  subtitle,
  className,
  ...props
}) => {
  return (
    <Box
      className={classNames(style.ThrobberSection, className)}
      {...props}
      display="flex"
      alignItems="center"
      p={1}
      bgcolor={theme.palette.primary.light}
    >
      <Throbber />
      <Box ml={2}>
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </Box>
    </Box>
  );
};

export default ThrobberSection;
