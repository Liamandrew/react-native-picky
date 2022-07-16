import * as React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Picker, PickerColumn, PickerItem } from 'react-native-picky';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Picker loop>
          <PickerColumn>
            <PickerItem label="A1" value="A1" />
            <PickerItem label="A2" value="A2" />
            <PickerItem label="A3" value="A3" />
            <PickerItem label="A4" value="A4" />
            <PickerItem label="A5" value="A5" />
          </PickerColumn>
        </Picker>

        <Picker
          loop
          onChange={(event) => console.log('Picker onChange: ', event)}
        >
          <PickerColumn
            onChange={(event) => console.log('PickerColumn onChange: ', event)}
          >
            <PickerItem label="A1" value="A1" />
            <PickerItem label="A2" value="A2" />
            <PickerItem label="A3" value="A3" />
            <PickerItem label="A4" value="A4" />
            <PickerItem label="A5" value="A5" />
          </PickerColumn>
          <PickerColumn>
            <PickerItem label="B1" value="B1" />
            <PickerItem label="B2" value="B2" />
            <PickerItem label="B3" value="B3" />
            <PickerItem label="B4" value="B4" />
            <PickerItem label="B5" value="B5" />
          </PickerColumn>
          <PickerColumn>
            <PickerItem label="C1" value="C1" />
            <PickerItem label="C2" value="C2" />
            <PickerItem label="C3" value="C3" />
            <PickerItem label="C4" value="C4" />
            <PickerItem label="C5" value="C5" />
          </PickerColumn>
        </Picker>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
});
