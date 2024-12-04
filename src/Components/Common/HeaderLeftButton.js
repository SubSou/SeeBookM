import { Pressable, StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const HeaderLeftButton = ({ pressFunc, marginTop = 27 }) => {
  return (
    <Pressable
      onPress={() => {
        pressFunc();
      }}
      style={[style.leftIcon, { width: '20%', marginTop }]}
    >
      <AntDesign name="left" size={15} color="#505050" />
    </Pressable>
  );
};

const style = StyleSheet.create({
  leftIcon: {},
});

export default HeaderLeftButton;
