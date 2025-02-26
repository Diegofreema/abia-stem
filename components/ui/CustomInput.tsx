/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { colors } from '@/constants';
import { Field, Input, InputProps, Textarea } from '@chakra-ui/react';
import { SelectProps } from '@radix-ui/react-select';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { NormalText } from '../typography/Title';
type Props<TFormValues extends FieldValues> = InputProps & {
  name: Path<TFormValues>;
  errors: FieldErrors<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  password?: boolean;
  toggleSecure?: () => void;
  mode?: 'input' | 'textarea' | 'select' | 'switch';
  collections?: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
};

export const ValidatorField = <TFormValues extends Record<string, any>>({
  label,
  errors,
  name,
  control,
  mode = 'input',
  collections,

  ...props
}: Props<TFormValues>): JSX.Element => {
  return (
    <Field.Root>
      <Field.Label color={colors.textGrey}>{label}</Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            {...props}
            mode={mode}
            collections={collections}
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

export const CustomInput = ({
  collections,
  ...props
}: InputProps & {
  mode?: 'input' | 'textarea' | 'select' | 'switch';
  collections?: {
    value: string;
    label: string;
  }[];
}) => {
  return (
    <>
      {props.mode === 'select' && (
        <CustomSelect
          placeholder={props.placeholder as string}
          collections={collections!}
          value={props.value as string}
          onValueChange={props.onChange as any}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
        />
      )}{' '}
      {props.mode === 'input' && (
        <Input
          {...props}
          color={colors.black}
          borderWidth={1}
          borderColor={colors.textGrey}
          borderStyle={'solid'}
          focusRingColor={colors.skyBlue}
          p={2}
        />
      )}
      {props.mode === 'textarea' && (
        // @ts-ignore
        <Textarea
          {...props}
          color={colors.black}
          borderWidth={1}
          borderColor={colors.textGrey}
          borderStyle={'solid'}
          focusRingColor={colors.skyBlue}
          resize={'none'}
          rows={8}
          p={2}
        />
      )}
    </>
  );
};

const CustomSelect = ({
  onValueChange,
  defaultValue,
  placeholder,
  collections,
  disabled,
}: SelectProps & {
  placeholder: string;
  collections: {
    value: string;
    label: string;
  }[];
}) => {
  console.log(defaultValue);

  return (
    <Select
      onValueChange={onValueChange}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="text-black focus:ring-0 p-2 "
        />
      </SelectTrigger>
      <SelectContent>
        {collections.map((collection) => (
          <SelectItem key={collection.value} value={collection.value}>
            {collection.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
