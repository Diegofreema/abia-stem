import { Avatar, AvatarGroup, For, Stack } from '@chakra-ui/react';
import { NormalText } from '../typography/Title';
import { colors } from '@/constants';
const imgs = [
  'https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd',
  'https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c',
  'https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863',
  'https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c',
];
export const HoverAvatarCard = (): JSX.Element => {
  return (
    <Stack
      bg="#08BC87"
      borderRadius={9}
      gap={3}
      position={'absolute'}
      top={'30%'}
      right={5}
      p={4}
    >
      <NormalText color={colors.white} fontWeight={600}>
        Our daily new students
      </NormalText>
      <AvatarGroup gap="0" spaceX="-3" size="md">
        <For each={imgs}>
          {(img, index) => (
            <Avatar.Root key={index}>
              <Avatar.Fallback name="Uchiha Sasuke" width={35} height={35} />
              <Avatar.Image
                width={37}
                height={37}
                borderRadius={50}
                src={img}
              />
            </Avatar.Root>
          )}
        </For>
        <Avatar.Root variant="solid">
          <Avatar.Fallback>1k+</Avatar.Fallback>
        </Avatar.Root>
      </AvatarGroup>
    </Stack>
  );
};
