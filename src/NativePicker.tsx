import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';
import type {
  NativeColorType,
  NativeOnChange,
  NativePickerDataItem,
} from './types';

const ComponentName = 'Picky';

type NativeIOSData = NativePickerDataItem[];
type NativeAndroidData = NativePickerDataItem;

type NativeCommonProps = {
  loop?: boolean;
  data: NativeIOSData | NativeAndroidData;
  onChange?: NativeOnChange;
};

type NativeIOSProps = {
  numberOfLines?: number;
  columnWidths: number[];
  style?: StyleProp<ViewStyle>;
  selectedIndexes?: number[];
  testID?: string;
};

type NativeAndroidProps = {
  column?: number;
  curtainColor?: NativeColorType;
  hasCurtain?: boolean;
  hasIndicator?: boolean;
  indicatorSize?: number;
  indicatorColor?: NativeColorType;
  itemSpace?: number;
  textColor?: NativeColorType;
  textSize?: number;
  selectedIndex?: number;
};

export type NativePickerProps = NativeCommonProps &
  (NativeIOSProps | NativeAndroidProps);

export const NativePicker =
  requireNativeComponent<NativePickerProps>(ComponentName);
