import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from '../../../color';

const LoginButton = ({ isBtnActive, authLogin }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        { backgroundColor: isBtnActive ? LIGHTGRAY : SIGNATURECOLOR },
      ]}
      onPress={authLogin}
      disabled={isBtnActive}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 14, color: isBtnActive ? MEDIUMGRAY : WHITE }}>
        로그인
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    borderRadius: 10,
  },
});
