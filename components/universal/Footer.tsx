import { Separator, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import { FlexWrapper } from '../custom-components/FlexWrapper';
import { NormalText, Title } from '../typography/Title';
import Image from 'next/image';
import { Socials } from '../custom-components/Socials';
import { footerLinks } from '@/dummy_data';
import { Link } from 'next-view-transitions';

export const Footer = () => {
  return (
    <Stack py={10} mx={'auto'} width={{ base: '90%', md: '80%', lg: '70%' }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 5, md: 10 }}>
        <Stack gap={4}>
          <Image src={'/logo.svg'} width={150} height={50} alt="logo" />
          <NormalText>
            Eduport education theme, built specifically for the education
            centers which is dedicated to teaching and involve learners.
          </NormalText>
          <Socials />
        </Stack>
        {footerLinks.map((f, i) => (
          <Stack key={i} gap={4}>
            <Title fontSize={'xl'} color={'black'} fontWeight={'bold'}>
              {f.title}
            </Title>
            {f.links.map((item, index) => (
              <Link key={index} href={item.url}>
                <NormalText className="text-lg hover:text-blue-400 transition">
                  {item.name}
                </NormalText>
              </Link>
            ))}
          </Stack>
        ))}
        <Stack gap={4}>
          <Title fontSize={'xl'} color={'black'} fontWeight={'bold'}>
            Contact
          </Title>

          <NormalText className="text-lg">Call:+1234 568 963</NormalText>
          <NormalText className="text-lg">Email:example@gmail.com</NormalText>
        </Stack>
      </SimpleGrid>
      <Separator />
      <FlexWrapper></FlexWrapper>
    </Stack>
  );
};
