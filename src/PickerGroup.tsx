import React, { ReactElement } from 'react';
import type { PickerItemProps } from './PickerItem';
import type { NativeOnChangeEvent, NativeValue } from './types';

type PickerGroupChild = ReactElement<PickerItemProps>;

export interface PickerGroupProps {
  selectedValue?: NativeValue;
  onChange?: NativeOnChangeEvent;
  children: PickerGroupChild | PickerGroupChild[];
}

export const PickerGroup = ({ children }: PickerGroupProps) => {
  return <>{children}</>;
};
