import React, {
  Children,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  Platform,
  processColor,
  View,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  LayoutChangeEvent,
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
  const { width: windowWidth } = useWindowDimensions();
  const [viewWidth, setViewWidth] = useState(windowWidth);
  const { data, columnWidths, selectedIndexes } = useNativePickerColumns({
    children,
    textColor,
    viewWidth,
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

  const handleOnLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => setViewWidth(width),
    []
  );

  if (Platform.OS === 'ios') {
    return (
      <View onLayout={handleOnLayout}>
        <NativePicker
          selectedIndexes={selectedIndexes}
          onChange={handleOnChange}
          numberOfLines={numberOfLines}
          data={data}
          columnWidths={columnWidths}
          loop={loop}
          style={[styles.picker, style]}
          testID={testID}
        />
      </View>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View onLayout={handleOnLayout} style={styles.androidContainer}>
        {data.map((componentData, index) => (
          <View
            key={`picky-component-${index}`}
            style={[
              {
                width: columnWidths[index] + LABEL_INSET_SPACE,
              },
              style,
            ]}
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
  viewWidth,
  children,
  textColor,
}: Required<Pick<PickerProps, 'children' | 'textColor'>> & {
  viewWidth: number;
}) =>
  useMemo(() => {
    let columnWidths: number[] = [];
    const selectedIndexes: number[] = [];
    const data: NativePickerDataItem[] = [];

    let availableSpace = viewWidth;

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

      if (typeof columnChild.props.width === 'number') {
        const w = Math.max(columnChild.props.width - LABEL_INSET_SPACE, 0);

        availableSpace -= columnChild.props.width;

        columnWidths.push(w);
      } else {
        columnWidths.push(-1);
      }

      data.push(columnItems);
    });

    // Automatically set width for remaining columns to the available space
    const columnsWithoutWidth = columnWidths.filter((w) => w < 0);
    if (columnsWithoutWidth.length) {
      columnWidths = columnWidths.map((w) =>
        w < 0
          ? Math.max(
              availableSpace / columnsWithoutWidth.length - LABEL_INSET_SPACE,
              0
            )
          : w
      );
    }

    return { data, columnWidths, selectedIndexes };
  }, [children, textColor, viewWidth]);

const LABEL_INSET_SPACE = 20;

const styles = StyleSheet.create({
  androidContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  picker: {
    height: 216,
  },
});
