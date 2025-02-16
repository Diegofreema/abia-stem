'use client';
import { colors } from '@/constants';
import { Input } from '@chakra-ui/react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { Session, User } from 'better-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Button } from '../ui/button';
import { AvatarMenu } from './AvatarMenu';
import { FlexWrapper } from './FlexWrapper';

type Props = {
  user: User | undefined;
  session: Session | undefined;
};
export const HeaderLeft = ({ user, session }: Props) => {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' });
  console.log(user);

  const router = useRouter();
  const pathname = usePathname();
  const onSignIn = () => {
    localStorage.setItem('callbackUrl', pathname);
    router.push('/auth/sign-in');
  };

  return (
    <FlexWrapper gap={3} alignItems={'center'}>
      <FlexWrapper
        borderColor={'#E5E5E5'}
        borderStyle={'solid'}
        borderWidth={1}
        borderRadius={5}
        alignItems={'center'}
        gap={2}
        px={1}
      >
        <Input
          border={0}
          focusRing={'none'}
          color={'black'}
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          p={3}
        />
        {query && (
          <IconX
            color={colors.blue}
            size={25}
            onClick={() => setQuery('')}
            className="cursor-pointer"
          />
        )}
        <IconSearch color="black" size={25} />
      </FlexWrapper>
      {!session ? (
        <Button
          backgroundColor={colors.skyBlue}
          px={4}
          color={colors.blue}
          onClick={onSignIn}
        >
          Login
        </Button>
      ) : (
        <AvatarMenu
          image={user?.image || '/boy.png'}
          email={user?.email || ''}
          name={user?.name || ''}
        />
      )}
    </FlexWrapper>
  );
};
