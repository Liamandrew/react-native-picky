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
import type { PickerColumnProps } from './PickerColumn';
import type {
  NativeItem,
  NativeOnChange,
  NativePickerDataItem,
  PickerColumnChangeItem,
} from './types';

type PickerChild = ReactElement<PickerColumnProps>;

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
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  onChange?: (item: PickerColumnChangeItem) => void;
  testID?: string;
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
  numberOfLines = 1,
  onChange,
  style,
  children,
  testID,
}: PickerProps) => {
  const { data, selectedIndexes } = useNativePickerColumns({
    children,
    textColor,
  });

  const handleOnChange: NativeOnChange = useCallback(
    ({ nativeEvent }) => {
      if (onChange) {
        onChange(nativeEvent);
      }

      Children.forEach(children, (columnChild, index) => {
        if (index === nativeEvent.column && columnChild.props.onChange) {
          columnChild.props.onChange(nativeEvent);
        }
      });
    },
    [onChange, children]
  );

  if (Platform.OS === 'ios') {
    return (
      <NativePicker
        selectedIndexes={selectedIndexes}
        onChange={handleOnChange}
        numberOfLines={numberOfLines}
        data={data}
        loop={loop}
        style={[styles.picker, style]}
        testID={testID}
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
              column={index}
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
              testID={testID}
            />
          </View>
        ))}
      </View>
    );
  }

  return null;
};

const useNativePickerColumns = ({
  children,
  textColor,
}: Required<Pick<PickerProps, 'children' | 'textColor'>>) =>
  useMemo(() => {
    const selectedIndexes: number[] = [];
    const data: NativePickerDataItem[] = [];

    Children.forEach(children, (columnChild, columnChildIndex) => {
      const columnItems: NativeItem[] = [];

      Children.forEach(
        columnChild.props.children,
        (itemChild, itemChildIndex) => {
          if (
            columnChild.props.selectedValue &&
            itemChild.props.value === columnChild.props.selectedValue &&
            selectedIndexes.length <= columnChildIndex
          ) {
            selectedIndexes.push(itemChildIndex);
          }

          columnItems.push({
            label: itemChild.props.label,
            value: itemChild.props.value,
            textColor: processColor(itemChild.props.color ?? textColor),
            testID: itemChild.props.testID,
          });
        }
      );

      if (selectedIndexes.length <= columnChildIndex) {
        selectedIndexes.push(0);
      }

      data.push(columnItems);
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
