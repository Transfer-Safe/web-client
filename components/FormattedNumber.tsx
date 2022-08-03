import NumberFormat, { NumberFormatProps } from 'react-number-format';

type FormattedNumberProps = NumberFormatProps;

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  thousandSeparator = ' ',
  displayType = 'text',
  ...props
}) => {
  return (
    <NumberFormat
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      {...props}
    />
  );
};

export default FormattedNumber;
