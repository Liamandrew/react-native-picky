import React, { Children, ReactElement, useMemo, useCallback } from 'react';
import { NativeSyntheticEvent, processColor, StyleSheet } from 'react-native';
import {
  NativeItem,
  NativePicker,
  NativePickerChangeEvent,
  NativePickerDataItem,
  NativePickerProps,
} from './NativePicker';
import type { PickerGroupProps } from './PickerGroup';

type PickerChild = ReactElement<PickerGroupProps>;

export interface PickerProps
  extends Pick<NativePickerProps, 'loop' | 'onChange'> {
  children: PickerChild | PickerChild[];
}

export const Picker = ({ loop, onChange, children }: PickerProps) => {
  const { data, selectedIndexes } = useGroupedNativePicker({ children });

  const handleOnChange = useCallback(
    (event: NativeSyntheticEvent<NativePickerChangeEvent>) => {
      if (onChange) {
        onChange(event);
      }

      Children.forEach(children, (groupChild, index) => {
        if (
          index === event.nativeEvent.component &&
          groupChild.props.onChange
        ) {
          groupChild.props.onChange(event);
        }
      });
    },
    [onChange, children]
  );

  return (
    <NativePicker
      selectedIndexes={selectedIndexes}
      data={data}
      loop={loop}
      onChange={handleOnChange}
      style={style.picker}
    />
  );
};

const useGroupedNativePicker = ({ children }: Pick<PickerProps, 'children'>) =>
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
            textColor: processColor(itemChild.props.color),
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
  }, [children]);

const style = StyleSheet.create({
  picker: {
    height: 216,
  },
});
