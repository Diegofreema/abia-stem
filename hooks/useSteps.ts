import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export const useStep = () => {
  return useQueryStates(
    {
      step: parseAsInteger.withDefault(0),
      title: parseAsString.withDefault('Course Detail'),
    },
    {
      history: 'push',
    }
  );
};
