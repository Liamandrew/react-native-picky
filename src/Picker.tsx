import React, { Children, ReactElement, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Platform,
  processColor,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { NativePicker } from './NativePicker';
import type { PickerGroupProps } from './PickerGroup';
import type {
  NativeItem,
  NativeOnChange,
  NativePickerDataItem,
  PickerGroupChangeItem,
} from './types';

type PickerChild = ReactElement<PickerGroupProps>;

export interface PickerProps {
  loop?: boolean;
  children: PickerChild | PickerChild[];
  hasCurtain?: boolean;
  curtainColor?: string;
  hasIndicator?: boolean;
  indicatorColor?: string;
  indicatorSize?: number;
  itemSpace?: number;
  textColor?: string;
  textSize?: number;
  selectedIndex?: number;
  style?: StyleProp<ViewStyle>;
  onChange?: (item: PickerGroupChangeItem) => void;
}

export const Picker = ({
  curtainColor = 'hsla(0, 0%, 0%, 0.1)',
  hasCurtain = true,
  hasIndicator = true,
  indicatorColor = 'hsla(0, 0%, 0%, 0.1)',
  indicatorSize = 1,
  itemSpace = 12,
  textColor = '#000000',
  textSize = 20,
  loop,
  onChange,
  style,
  children,
}: PickerProps) => {
  const { data, selectedIndexes } = useGroupedNativePicker({
    children,
    textColor,
  });

  const handleOnChange: NativeOnChange = useCallback(
    ({ nativeEvent }) => {
      if (onChange) {
        onChange(nativeEvent);
      }

      Children.forEach(children, (groupChild, index) => {
        if (index === nativeEvent.group && groupChild.props.onChange) {
          groupChild.props.onChange(nativeEvent);
        }
      });
    },
    [onChange, children]
  );

  if (Platform.OS === 'ios') {
    return (
      <NativePicker
        selectedIndexes={selectedIndexes}
        data={data}
        loop={loop}
        onChange={handleOnChange}
        style={[styles.picker, style]}
      />
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View style={styles.androidContainer}>
        {data.map((componentData, index) => (
          <View
            key={`picky-component-${index}`}
            style={[styles.androidPickyContainer, style]}
          >
            <NativePicker
              group={index}
              data={componentData}
              loop={loop}
              onChange={handleOnChange}
              curtainColor={processColor(curtainColor)}
              hasCurtain={hasCurtain}
              hasIndicator={hasIndicator}
              indicatorColor={processColor(indicatorColor)}
              indicatorSize={indicatorSize}
              itemSpace={itemSpace}
              textColor={processColor(textColor)}
              textSize={textSize}
              selectedIndex={selectedIndexes[index]}
              style={styles.picker}
            />
          </View>
        ))}
      </View>
    );
  }

  return null;
};

const useGroupedNativePicker = ({
  children,
  textColor,
}: Required<Pick<PickerProps, 'children' | 'textColor'>>) =>
  useMemo(() => {
    const selectedIndexes: number[] = [];
    const data: NativePickerDataItem[] = [];

    Children.forEach(children, (groupChild, groupChildIndex) => {
      const groupItems: NativeItem[] = [];

      Children.forEach(
        groupChild.props.children,
        (itemChild, itemChildIndex) => {
          if (
            groupChild.props.selectedValue &&
            itemChild.props.value === groupChild.props.selectedValue &&
            selectedIndexes.length <= groupChildIndex
          ) {
            selectedIndexes.push(itemChildIndex);
          }

          groupItems.push({
            label: itemChild.props.label,
            value: itemChild.props.value,
            textColor: processColor(itemChild.props.color ?? textColor),
            testID: itemChild.props.testID,
          });
        }
      );

      if (selectedIndexes.length <= groupChildIndex) {
        selectedIndexes.push(0);
      }

      data.push(groupItems);
    });

    return { data, selectedIndexes };
  }, [children, textColor]);

const styles = StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
  },
  androidPickyContainer: {
    flex: 1,
  },
  picker: {
    height: 216,
  },
});
