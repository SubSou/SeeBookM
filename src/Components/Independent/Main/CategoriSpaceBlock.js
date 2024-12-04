import { StyleSheet, View } from 'react-native';
import { LIGHTGRAY } from '../../../color';

const CategoriSpaceBlock = () => {
  return <View style={styles.spaceBlockCon}></View>;
};

const styles = StyleSheet.create({
  spaceBlockCon: {
    width: '100%',
    height: 3,
    backgroundColor: LIGHTGRAY,
  },
});

export default CategoriSpaceBlock;
