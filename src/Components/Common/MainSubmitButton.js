import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vScale } from '../../Normalization';
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from '../../color';

const MainSubmitButton = ({
  toggleData = false,
  msg,
  pressFunc,
  marginTop = 0,
}) => {
  return (
    <Pressable onPress={pressFunc}>
      <View
        style={[
          styles.mainSubCon,
          {
            backgroundColor: toggleData ? SIGNATURECOLOR : LIGHTGRAY,
            marginTop: marginTop,
          },
        ]}
      >
        <Text style={{ color: toggleData ? WHITE : MEDIUMGRAY }}>{msg}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainSubCon: {
    width: '100%',
    height: vScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default MainSubmitButton;
