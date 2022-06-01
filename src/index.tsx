import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-picky' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type PickyProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'PickyView';

export const PickyView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PickyProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
