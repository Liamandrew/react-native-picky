import type { NativeSyntheticEvent, processColor } from 'react-native';

export type NativeColorType = ReturnType<typeof processColor>;

export type NativeItem = {
  label: string;
  value: string | number;
  testID?: string;
  textColor: NativeColorType;
};

export type NativePickerDataItem = NativeItem[];

export type PickerGroupChangeItem = {
  value: string | number;
  index: number;
  group: number;
};

export type NativePickerChangeEvent = {
  group: number;
  index: number;
  value: string | number;
};

export type NativeOnChangeEvent = (
  event: NativeSyntheticEvent<NativePickerChangeEvent>
) => void;
