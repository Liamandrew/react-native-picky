import React from 'react';
import { render } from '@testing-library/react-native';
import { Picker } from '../Picker';
import { PickerColumn } from '../PickerColumn';
import { PickerItem } from '../PickerItem';

describe('<Picker>', () => {
  describe('selectedIndexes', () => {
    it('should render correct default selectedIndexes for single column', () => {
      const { getByTestId } = render(
        <Picker testID="basic-picker">
          <PickerColumn>
            <PickerItem label="A1" value="A1" />
            <PickerItem label="A2" value="A2" />
          </PickerColumn>
        </Picker>
      );

      const picker = getByTestId('basic-picker');

      expect(picker.props.selectedIndexes).toEqual([0]);
    });

    it('should render correct selectedIndexes for single column', () => {
      const { getByTestId } = render(
        <Picker testID="basic-picker">
          <PickerColumn selectedValue="A2">
            <PickerItem label="A1" value="A1" />
            <PickerItem label="A2" value="A2" />
          </PickerColumn>
        </Picker>
      );

      const picker = getByTestId('basic-picker');

      expect(picker.props.selectedIndexes).toEqual([1]);
    });

    it('should render correct selectedIndexes for multiple column', () => {
      const { getByTestId } = render(
        <Picker testID="basic-picker">
          <PickerColumn selectedValue="A2">
            <PickerItem label="A1" value="A1" />
            <PickerItem label="A2" value="A2" />
          </PickerColumn>
          <PickerColumn selectedValue="C3">
            <PickerItem label="C1" value="C1" />
            <PickerItem label="C2" value="C2" />
            <PickerItem label="C3" value="C3" />
          </PickerColumn>
        </Picker>
      );

      const picker = getByTestId('basic-picker');

      expect(picker.props.selectedIndexes).toEqual([1, 2]);
    });
  });
});
