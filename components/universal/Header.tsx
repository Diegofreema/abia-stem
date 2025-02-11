'use client';
import React from 'react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { CategorySwitcher } from '../custom-components/CategorySwitcher';
import { HeaderLeft } from '../custom-components/HeaderLeft';

export const Header = () => {
  return (
    <FlexWrapper p={14} alignItems={'center'} justifyContent={'space-between'}>
      <FlexWrapper alignItems={'center'} gap={5}>
        <Link href={'/'}>
          <Image src={'/logo.svg'} width={150} height={50} alt="logo" />
        </Link>
        <CategorySwitcher />
      </FlexWrapper>
      <HeaderLeft />
    </FlexWrapper>
  );
};
