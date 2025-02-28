'use client';

import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

type EditorProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled: boolean;
};

export const Editor = ({
  value,
  onChange,
  placeholder,
  disabled,
}: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={disabled}
      className="w-full  text-black"
    />
  );
};
