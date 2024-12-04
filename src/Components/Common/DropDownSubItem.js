import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const DropDownSubItem = React.memo(
  ({ item, handleSelectDropData, toggleMaleDropdown }) => {
    const touchDropDonwSubItem = (item) => {
      handleSelectDropData({ label: item.label, value: item.value });
      toggleMaleDropdown();
    };

    return (
      <Pressable
        onPress={() => {
          touchDropDonwSubItem(item);
        }}
      >
        <View style={styles.itemCon}>
          <Text>{item.label}</Text>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  itemCon: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default DropDownSubItem;
