import { create } from 'zustand';

type Store = {
  image: File | null;
  video: File | null;
  clearImage: () => void;
  clearVideo: () => void;
  setVideo: (videoUrl: File) => void;
  setImage: (imageUrl: File) => void;
  imageUrl: string;
  videoUrl: string;
};

export const useMedia = create<Store>((set) => ({
  image: null,
  video: null,
  clearImage: () => {
    set((state) => ({ ...state, image: null, imageUrl: '' }));
  },
  clearVideo: () => {
    set((state) => ({ ...state, video: null, videoUrl: '' }));
  },
  setImage: (image: File) => {
    set((state) => {
      const imageUrl = URL.createObjectURL(image);
      return { ...state, image, imageUrl };
    });
  },
  setVideo: (video: File) => {
    set((state) => {
      const videoUrl = URL.createObjectURL(video);
      return { ...state, video, videoUrl };
    });
  },
  imageUrl: '',
  videoUrl: '',
}));
