/* eslint-disable @typescript-eslint/no-explicit-any */
import { colors } from '@/constants';
import { Field } from '@chakra-ui/react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { Editor } from './editor';
import { NormalText } from '../typography/Title';

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  errors: FieldErrors<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  placeholder?: string;
};

export const RichTextEditor = <TFormValues extends Record<string, any>>({
  control,
  errors,
  name,
  label,
  placeholder,
}: Props<TFormValues>) => {
  return (
    <Field.Root>
      <Field.Label color={colors.textGrey}>{label}</Field.Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Editor
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <NormalText color={colors.red}>
          {errors[name]?.message as string}
        </NormalText>
      )}
    </Field.Root>
  );
};
