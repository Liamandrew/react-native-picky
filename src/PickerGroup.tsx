import React, { ReactElement } from 'react';
import type { NativeSyntheticEvent } from 'react-native';
import type { NativePickerChangeEvent, NativeValue } from './NativePicker';
import type { PickerItemProps } from './PickerItem';

type PickerGroupChild = ReactElement<PickerItemProps>;

export interface PickerGroupProps {
  selectedValue?: NativeValue;
  onChange?: (event: NativeSyntheticEvent<NativePickerChangeEvent>) => void;
  children: PickerGroupChild | PickerGroupChild[];
}

export const PickerGroup = ({ children }: PickerGroupProps) => {
  return <>{children}</>;
};
