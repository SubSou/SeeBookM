import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import StepTitle from '../../Common/StepTitle';
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR } from '../../../color';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../../navigations/routes';
import { useSignUpContext } from '../../../contexts/SignUpContext';

const FindEmailStepB = ({ offsetB, findEmail }) => {
  const navigation = useNavigation();

  const goToPasswordChangeVerification = () => {
    navigation.replace(AuthRoutes.PasswordChangeVerificationPage);
  };

  return (
    <Animated.View
      style={[
        styles.stepBCon,
        {
          transform: [{ translateX: offsetB }],
        },
      ]}
    >
      <StepTitle title="이메일을 찾았어요!" />
      <View style={styles.stepBFindBox}>
        <Text style={styles.stepBFindText}>{findEmail}</Text>
      </View>
      <Pressable onPress={goToPasswordChangeVerification}>
        <View style={styles.stepBUnderBox}>
          <Text style={styles.stepBUnderText}>비밀번호찾기</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  stepBCon: {
    width: '100%',
    position: 'absolute',
  },
  stepBFindBox: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
    marginTop: 50,
    alignItems: 'center',
  },
  stepBFindText: {
    color: SIGNATURECOLOR,
  },
  stepBUnderBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  stepBUnderText: {
    textDecorationLine: 'underline',
    textDecorationColor: LIGHTGRAY,
    color: MEDIUMGRAY,
    fontSize: 12,
  },
});

export default FindEmailStepB;
