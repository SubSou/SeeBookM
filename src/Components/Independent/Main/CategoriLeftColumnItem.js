import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LIGHTGRAY, NEARWHITE, WHITE } from '../../../color';
import { scale, vScale } from '../../../Normalization';

const CategoriLeftColumnItem = ({
  selected1depth,
  depth1,
  handle1depthSelect,
}) => {
  return (
    <TouchableOpacity
      key={depth1}
      style={[
        styles.depth1Button,
        {
          backgroundColor: selected1depth === depth1 ? WHITE : NEARWHITE,
        },
      ]}
      onPress={() => handle1depthSelect(depth1)}
    >
      <Text style={styles.depth1Text}>{depth1}</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 2,
          paddingHorizontal: selected1depth === depth1 ? 0 : 9,
        }}
      >
        <View style={styles.depth1Boder}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  depth1Button: {
    width: scale(80),
    height: vScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  depth1Boder: {
    backgroundColor: LIGHTGRAY,
    height: '100%',
  },
});

export default CategoriLeftColumnItem;
