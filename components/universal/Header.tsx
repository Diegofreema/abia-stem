import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { CategorySwitcher } from '../custom-components/CategorySwitcher';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { HeaderLeft } from '../custom-components/HeaderLeft';
import { AccountSwitcher } from '../custom-components/AccountSwitcher';
import { Suspense } from 'react';

export const Header = async () => {
  // const user = session?.user;

  return (
    <FlexWrapper p={14} alignItems={'center'} justifyContent={'space-between'}>
      <FlexWrapper alignItems={'center'} gap={5}>
        <Link href={'/'}>
          <Image src={'/logo.svg'} width={150} height={50} alt="logo" />
        </Link>
        <Suspense>
          <CategorySwitcher />
        </Suspense>
        <Suspense>
          <AccountSwitcher />
        </Suspense>
      </FlexWrapper>

      <HeaderLeft />
    </FlexWrapper>
  );
};
