import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vScale } from '../../../Normalization';
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from '../../../color';

const KakaoSignButton = ({ toggleBtn, handleFunc }) => {
  return (
    <Pressable onPress={handleFunc}>
      <View
        style={[
          styles.kakaoSignCon,
          { backgroundColor: toggleBtn ? SIGNATURECOLOR : LIGHTGRAY },
        ]}
      >
        <Text style={{ color: toggleBtn ? WHITE : MEDIUMGRAY }}>
          회원가입 하기
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  kakaoSignCon: {
    width: '100%',
    height: vScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 200,
  },
});

export default KakaoSignButton;
