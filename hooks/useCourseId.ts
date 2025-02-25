import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Store = {
  courseId: Id<'courses'> | null;
  setCourseId: (id: Id<'courses'>) => void;
  removeCourseId: () => void;
};
export const useCourseId = create<Store>()(
  persist(
    (set) => ({
      courseId: null,
      setCourseId: (id) => set({ courseId: id }),
      removeCourseId: () => set({ courseId: null }),
    }),
    {
      name: 'courseId',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
