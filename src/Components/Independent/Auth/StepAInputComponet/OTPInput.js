import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  BLACK,
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
} from '../../../../color';
import { PropTypes } from 'prop-types';
const OTPInput = ({
  handleInputActivie,
  handleNonInputActivie,
  otpActivie,
  ...props
}) => {
  const handleCodeNotReceived = () => {
    Alert.alert(
      '안내사항',
      '가입하신 정보를 다시 확인하고, 인증번호 재전송을 눌러주세요.'
    );
  };

  return (
    <View style={styles.otpBox}>
      <TextInput
        {...props}
        placeholder="인증번호를 입력해주세요"
        maxLength={6}
        style={[
          styles.leftTextWidth,
          styles.darkGrayColor,
          {
            borderBottomColor: otpActivie ? SELECTBLACK : LIGHTGRAY,
          },
        ]}
        placeholderTextColor={MEDIUMGRAY}
        selectionColor={BLACK}
        onFocus={() => {
          handleInputActivie('otpActivie');
        }}
        onBlur={() => {
          handleNonInputActivie('otpActivie');
        }}
      />
      <Pressable onPress={handleCodeNotReceived}>
        <View style={[styles.rightTextWidth]}>
          <Text style={styles.otpNonText}>인증문자가 오지 않아요!</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  otpBox: {
    gap: 10,
    marginTop: 30,
  },
  leftTextWidth: {
    width: '100%',
    textAlignVertical: 'top',
    borderBottomWidth: 1,
  },
  rightTextWidth: {
    alignItems: 'flex-end',
  },
  darkGrayColor: {
    color: DARKGRAY,
  },

  otpNonText: {
    borderBottomColor: LIGHTGRAY,
    borderBottomWidth: 1,
    color: MEDIUMGRAY,
    fontSize: 10,
  },
});

export default OTPInput;
