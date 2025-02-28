import { Doc, Id } from './convex/_generated/dataModel';

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};

export type IRoutes = {
  path: string;
  label: string;
  icon: string;
};

export type TitleProps = {
  title: string;
  loggedInUserId: Id<'users'>;
  course:
    | (Doc<'courses'> & {
        imageUrl: string;
        videoUrl: string;
        attachments: Doc<'attachments'>[];
      })
    | null;
};

export type CourseType =
  | (Doc<'courses'> & {
      imageUrl: string;
      videoUrl: string;
      attachments: Doc<'attachments'>[];
    })
  | null;
