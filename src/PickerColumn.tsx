import React, { ReactElement } from 'react';
import type { PickerItemProps } from './PickerItem';
import type { PickerColumnChangeItem } from './types';

type PickerColumnChild = ReactElement<PickerItemProps>;

export interface PickerColumnProps {
  width?: number;
  selectedValue?: string | number;
  onChange?: (item: PickerColumnChangeItem) => void;
  children: PickerColumnChild | PickerColumnChild[];
}

export const PickerColumn = ({ children }: PickerColumnProps) => {
  return <>{children}</>;
};
