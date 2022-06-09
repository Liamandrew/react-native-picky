import {
  requireNativeComponent,
  UIManager,
  Platform,
  processColor,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
} from 'react-native';
import type { PickerItemProps } from './PickerItem';

const ComponentName = 'Picky';

export type NativeItem = Omit<PickerItemProps, 'color'> & {
  textColor: ReturnType<typeof processColor>;
};

export type NativePickerDataItem = NativeItem[];

export type NativeValue = number | string;

export type NativePickerChangeEvent = {
  component: number;
  index: number;
  value: NativeValue;
};

export interface NativePickerProps {
  loop?: boolean;
  data: NativePickerDataItem[];
  onChange?: (event: NativeSyntheticEvent<NativePickerChangeEvent>) => void;
  selectedIndexes: number[];
  style?: StyleProp<ViewStyle>;
}

export const NativePicker =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativePickerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

const LINKING_ERROR =
  `The package 'react-native-picky' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';
