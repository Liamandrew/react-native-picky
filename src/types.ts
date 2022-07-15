import type { NativeSyntheticEvent, processColor } from 'react-native';

export type NativeColorType = ReturnType<typeof processColor>;

export type NativeItem = {
  label: string;
  value: string | number;
  testID?: string;
  textColor: NativeColorType;
};

export type NativePickerDataItem = NativeItem[];

export type PickerColumnChangeItem = {
  value: string | number;
  index: number;
  column: number;
};

export type NativePickerChangeEvent = {
  column: number;
  index: number;
  value: string | number;
};

export type NativeOnChange = (
  event: NativeSyntheticEvent<NativePickerChangeEvent>
) => void;
