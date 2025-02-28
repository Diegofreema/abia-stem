import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Doc } from '@/convex/_generated/dataModel';
import { useState } from 'react';
import { NormalText } from '../typography/Title';
import { Player } from './VideoComponent';
import ReactPlayer from 'react-player';
import { Stack } from '@chakra-ui/react';
import { colors } from '@/constants';
import { BadgeWithIcon } from './BadgeWithIcon';
import { IconBookUpload, IconMoneybag } from '@tabler/icons-react';
import { Editor } from './editor';

type Props = {
  chapters: Doc<'chapters'>[];
};
export const ChapterAccordion = ({ chapters }: Props) => {
  const [value, setValue] = useState(['second-item']);
  return (
    <AccordionRoot
      value={value}
      onValueChange={(e) => setValue(e.value)}
      maxW={'2xl'}
      mx="auto"
    >
      {chapters.map((item, index) => (
        <AccordionItem
          key={index}
          value={item._id}
          borderBottom={'1px solid black'}
        >
          <AccordionItemTrigger color={colors.black} fontWeight={'bold'} py={4}>
            {item.title}
          </AccordionItemTrigger>
          <AccordionItemContent>
            <Stack gap={5}>
              <Editor value={item.description} disabled={true} />
              <ReactPlayer
                url={item.videoUrl}
                controls
                width="100%"
                height="100%"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              <NormalText fontWeight={'bold'} color={colors.green}>
                {}
              </NormalText>
              <BadgeWithIcon
                text={item.isPaid ? 'Paid chapter' : 'Free chapter'}
                icon={IconMoneybag}
                colorPalette={item.isPaid ? 'green' : 'red'}
              />
              <BadgeWithIcon
                text={
                  item.isPublished
                    ? 'Has been Published'
                    : 'Has not been published'
                }
                icon={IconBookUpload}
                colorPalette={item.isPublished ? 'green' : 'red'}
              />
            </Stack>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
