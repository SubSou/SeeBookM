import { Pressable, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WHITE } from '../../../color';

const CameraHeaderLeftButton = ({ pressFunc }) => {
  return (
    <Pressable
      onPress={() => {
        pressFunc();
      }}
      style={[styles.leftIcon, { width: '20%' }]}
    >
      <AntDesign name="left" size={15} color={WHITE} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    position: 'absolute',
    top: 27,
    left: 30,
    zIndex: 100,
  },
});

export default CameraHeaderLeftButton;
