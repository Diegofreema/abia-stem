'use client';
import { colors } from '@/constants';
import { Card } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Avatar } from '../ui/avatar';
import { Rating } from '../ui/rating';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string; review: string; name: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export function StackCards({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 300, height: 400 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: 'https://themes.stackbros.in/eduport_r/assets/01-7N0KytgQ.jpg',
            review:
              'Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing',
            name: 'Jane Doe',
          },
          {
            id: 2,
            img: 'https://themes.stackbros.in/eduport_r/assets/03-gME39Lw5.jpg',
            review:
              'At weddings believed laughing although the Moonlight newspaper up its enjoyment agreeable depending.',
            name: 'John Doe',
          },
          {
            id: 3,
            img: 'https://themes.stackbros.in/eduport_r/assets/01-7N0KytgQ.jpg',
            review:
              'Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing',
            name: 'Jane Doe',
          },
          {
            id: 4,
            img: 'https://themes.stackbros.in/eduport_r/assets/03-gME39Lw5.jpg',
            review:
              'At weddings believed laughing although the Moonlight newspaper up its enjoyment agreeable depending.',
            name: 'John Doe',
          },
        ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation
          ? Math.random() * 10 - 5 // Random degree between -5 and 5
          : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <Card.Root
                backgroundColor={colors.pale}
                overflow={'hidden'}
                boxShadow={'md'}
              >
                <Card.Body display={'flex'} justifyContent={'center'} gap={2}>
                  <Avatar src={card.img} width={100} height={100} />
                  <Card.Title color={colors.black}>
                    <blockquote>{card.review}</blockquote>
                  </Card.Title>
                  <Rating defaultValue={4.5} colorPalette={'yellow'} />
                  <Card.Description color={colors.black} fontWeight={600}>
                    {card.name}
                  </Card.Description>
                </Card.Body>
              </Card.Root>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
