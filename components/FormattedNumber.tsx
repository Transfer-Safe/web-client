import { BigNumber, BigNumberish, constants } from 'ethers';
import { useMemo } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

type FormattedNumberProps = Omit<NumberFormatProps, 'value'> & {
  value: BigNumberish;
};

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  thousandSeparator = ' ',
  displayType = 'text',
  value,
  ...props
}) => {
  const numberValue = useMemo(() => {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      return value;
    }
    return (
      BigNumber.from(value).div(constants.WeiPerEther.div(1000)).toNumber() /
      1000
    );
  }, [value]);

  return (
    <NumberFormat
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      value={numberValue}
      {...props}
    />
  );
};

export default FormattedNumber;
