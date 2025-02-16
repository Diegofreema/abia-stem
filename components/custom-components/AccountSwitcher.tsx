'use client';
import { colors } from '@/constants';
import { accountLinks } from '@/dummy_data';
import { For } from '@chakra-ui/react';
import { IconChevronDown } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { NormalText } from '../typography/Title';
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from '../ui/hover-card';
import { FlexWrapper } from './FlexWrapper';

export const AccountSwitcher = (): JSX.Element => {
  const pathname = usePathname();

  return (
    <HoverCardRoot size={'md'} openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <FlexWrapper gap={2} alignItems={'center'} className="group">
          <NormalText
            color={colors.textGrey}
            fontSize={'lg'}
            fontWeight={'bold'}
            className="group-hover:text-blue-300 transition duration-150"
          >
            Accounts
          </NormalText>
          <IconChevronDown
            className="group-hover:text-blue-300 text-[#747579] transition duration-150"
            size={20}
          />
        </FlexWrapper>
      </HoverCardTrigger>
      <HoverCardContent maxWidth="240px" gap={3} backgroundColor={'white'}>
        <HoverCardArrow />
        <For each={accountLinks}>
          {({ account, icon: Icon, links }, index) => (
            <HoverCardRoot
              positioning={{ placement: 'right-end' }}
              openDelay={100}
              closeDelay={100}
            >
              <HoverCardTrigger>
                <FlexWrapper
                  _hover={{
                    color: colors.blue,
                    backgroundColor: colors.skyBlue,
                    transition: 'all 0.3s ease-in-out',
                  }}
                  backgroundColor={
                    pathname.includes(account.toLowerCase())
                      ? colors.skyBlue
                      : 'transparent'
                  }
                  px={3}
                  alignItems={'center'}
                >
                  <Icon color={colors.textGrey} size={20} />
                  <NormalText
                    key={index}
                    cursor={'pointer'}
                    p={2}
                    fontSize={'md'}
                    color={colors.textGrey}
                  >
                    {account}
                  </NormalText>
                </FlexWrapper>
              </HoverCardTrigger>
              <HoverCardContent backgroundColor={'white'} gap={3}>
                {links.map(({ icon: Icon, label, link }, index) => {
                  const isActive = pathname === link.toLowerCase();

                  return (
                    <Link key={link} href={link}>
                      <FlexWrapper
                        key={index}
                        _hover={{
                          color: colors.blue,
                          backgroundColor: colors.skyBlue,
                          transition: 'all 0.3s ease-in-out',
                        }}
                        px={3}
                        backgroundColor={
                          isActive ? colors.skyBlue : 'transparent'
                        }
                        alignItems={'center'}
                      >
                        <Icon color={colors.textGrey} size={20} />
                        <NormalText
                          cursor={'pointer'}
                          p={2}
                          fontSize={'md'}
                          _hover={{
                            color: colors.blue,
                            backgroundColor: colors.skyBlue,
                            transition: 'all 0.3s ease-in-out',
                          }}
                          color={colors.textGrey}
                        >
                          {label}
                        </NormalText>
                      </FlexWrapper>
                    </Link>
                  );
                })}
              </HoverCardContent>
            </HoverCardRoot>
          )}
        </For>
      </HoverCardContent>
    </HoverCardRoot>
  );
};
