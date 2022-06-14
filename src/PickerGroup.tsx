import React, { ReactElement } from 'react';
import type { PickerItemProps } from './PickerItem';
import type { PickerGroupChangeItem } from './types';

type PickerGroupChild = ReactElement<PickerItemProps>;

export interface PickerGroupProps {
  selectedValue?: string | number;
  onChange?: (item: PickerGroupChangeItem) => void;
  children: PickerGroupChild | PickerGroupChild[];
}

export const PickerGroup = ({ children }: PickerGroupProps) => {
  return <>{children}</>;
};
