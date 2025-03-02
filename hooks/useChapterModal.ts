import { useQueryState, parseAsBoolean } from 'nuqs';

export const useChapterModal = () => {
  return useQueryState('open', parseAsBoolean.withDefault(false));
};

export const useFAQModal = () => {
  return useQueryState('openFAQ', parseAsBoolean.withDefault(false));
};
