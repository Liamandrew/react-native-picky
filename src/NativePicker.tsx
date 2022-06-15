import {
  requireNativeComponent,
  UIManager,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
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
  style?: StyleProp<ViewStyle>;
  selectedIndexes?: number[];
};

type NativeAndroidProps = {
  group?: number;
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
