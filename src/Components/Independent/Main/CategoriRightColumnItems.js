import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CategoriRightColumnItem from './CategoriRightColumnItem';

const CategoriRightColumnItems = ({
  selected1depth,
  formattedData,
  handle2depthSelect,
  selectedTitle,
}) => {
  return (
    <View style={styles.rightColumn}>
      <CategoriRightColumnItem
        selected1depth={selected1depth}
        formattedData={formattedData}
        handle2depthSelect={handle2depthSelect}
        selectedTitle={selectedTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightColumn: {
    flex: 1,
    marginLeft: 20,

    marginRight: 20,
  },
});

export default CategoriRightColumnItems;
