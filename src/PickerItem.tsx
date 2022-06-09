import React from 'react';
import { ColorValue, Text } from 'react-native';

export interface PickerItemProps {
  color?: ColorValue;
  label: string;
  value: string | number;
  testID?: string;
}

export const PickerItem = ({ color, label, ...props }: PickerItemProps) => {
  return (
    <Text style={{ color }} {...props}>
      {label}
    </Text>
  );
};
