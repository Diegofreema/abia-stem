import { colors } from '@/constants';
import { Field } from '@chakra-ui/react';
import { SwitchProps } from '@radix-ui/react-switch';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

import { FlexWrapper } from '../custom-components/FlexWrapper';
import { Switch } from './switch';
type Props<TFormValues extends FieldValues> = SwitchProps & {
  name: Path<TFormValues>;
  errors: FieldErrors<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
};

export const ValidatorFieldSwitch = <TFormValues extends Record<string, any>>({
  label,
  errors,
  name,
  control,
}: Props<TFormValues>): JSX.Element => {
  return (
    <Field.Root
      invalid
      height={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'flex-end'}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FlexWrapper gap={3} alignItems={'center'} height={'40px'}>
            <Switch
              name={field.name}
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              inputProps={{ onBlur: field.onBlur }}
              color={colors.textGrey}
              colorPalette={'green'}
              focusRing={'transparent'}
              label={label}
              variant={'solid'}
              border={0}
              borderColor={'transparent'}
              outline={'none'}
              bg="transparent"
            />
            <Field.Label color={colors.textGrey}>{label}</Field.Label>
          </FlexWrapper>
        )}
      />
      {errors[name] && (
        <Field.ErrorText>{errors[name]?.message as string}</Field.ErrorText>
      )}
    </Field.Root>
  );
};
