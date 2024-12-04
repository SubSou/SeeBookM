import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LIGHTGRAY } from '../../../color';

const CategoriRightColumnItem = ({
  selected1depth,
  formattedData,
  handle2depthSelect,
  selectedTitle,
}) => {
  return (
    <View>
      {selected1depth &&
        formattedData[selectedTitle][selected1depth] &&
        formattedData[selectedTitle][selected1depth].map((depth2) => (
          <TouchableOpacity
            key={depth2}
            style={styles.depth2Button}
            onPress={() => handle2depthSelect(depth2)}
          >
            <Text style={styles.depth2Text}>{depth2}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  depth2Button: {
    paddingVertical: 21,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
  },
});

export default CategoriRightColumnItem;
