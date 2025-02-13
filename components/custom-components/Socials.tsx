import { FlexWrapper } from './FlexWrapper';

import { SocialIcon } from 'react-social-icons';

const icons = [
  { network: 'facebook' },
  { network: 'twitter' },
  { network: 'linkedin' },
  { network: 'instagram' },
];
export const Socials = (): JSX.Element => {
  return (
    <FlexWrapper gap={4}>
      {icons.map((icon, index) => (
        <SocialIcon
          network={icon.network}
          key={index}
          style={{ height: 30, width: 30 }}
          className="cursor-pointer transition hover:scale-110 duration-300"
        />
      ))}
    </FlexWrapper>
  );
};
