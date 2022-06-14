import type { NativeSyntheticEvent, processColor } from 'react-native';

export type NativeColorType = ReturnType<typeof processColor>;

export type NativeItem = {
  label: string;
  value: string | number;
  testID?: string;
  textColor: NativeColorType;
};

export type NativePickerDataItem = NativeItem[];

export type NativeValue = number | string;

export type NativePickerChangeEvent = {
  component: number;
  index: number;
  value: NativeValue;
};

export type NativeOnChangeEvent = (
  event: NativeSyntheticEvent<NativePickerChangeEvent>
) => void;
