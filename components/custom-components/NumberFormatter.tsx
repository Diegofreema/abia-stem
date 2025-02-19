import React from 'react';
import { FlexWrapper } from './FlexWrapper';
import { NormalText } from '../typography/Title';
import { colors } from '@/constants';

interface NumberFormatterProps {
  number: number;
  text?: string;
  big?: boolean;
}
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    // Format for millions (e.g., 1,000,000 → 1m)
    return `${Math.floor(num / 1000000)}m`;
  } else if (num >= 1000) {
    // Format for thousands (e.g., 1000 → 1k)
    return `${Math.floor(num / 1000)}k`;
  } else {
    // Return the number as-is for numbers below 1000
    return num.toString();
  }
};

const NumberFormatter: React.FC<NumberFormatterProps> = ({
  number,
  text,
  big,
}) => {
  const fontSize = big ? 30 : 18;
  const fontWeight = big ? 'bold' : 'normal';
  return (
    <FlexWrapper alignItems={'center'} gap={1}>
      <NormalText
        color={colors.black}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {formatNumber(number)}
      </NormalText>
      {text && (
        <NormalText color={colors.black} fontSize={18}>
          {text}
        </NormalText>
      )}
    </FlexWrapper>
  );
};

export default NumberFormatter;
