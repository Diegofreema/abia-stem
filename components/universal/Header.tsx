import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { CategorySwitcher } from '../custom-components/CategorySwitcher';
import { FlexWrapper } from '../custom-components/FlexWrapper';
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
