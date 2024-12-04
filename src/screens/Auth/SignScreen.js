import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import SignupStepA from '../../Components/Independent/Auth/SignupStepA';
import SignUpStepB from '../../Components/Independent/Auth/SignUpStepB';
import { useEffect, useRef, useState } from 'react';
import { SELECTBLACK } from '../../color';
import { vScale } from '../../Normalization';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import AccountActionButton from '../../Components/Common/AccountActionButton';
import {
  requestAuthSign,
  requestAuthPhoneOtpNumber,
} from '../../Api/Auth/AuthApi';
import { AuthRoutes } from '../../navigations/routes';
import { useSignUpContext } from '../../contexts/SignUpContext';

const SignScreen = () => {
  const { width } = Dimensions.get('window');

  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  const [step, setStep] = useState('stepA'); // 현재 회원가입 단계

  const [toggleBtn, setToggleBtn] = useState(false);

  const stepAMsg = '다음';
  const stepBMsg = '회원가입하기';

  const { setUserInfo, userInfo, initUserInfoData, validatePasswordFormat } =
    useSignUpContext();

  const navigation = useNavigation();

  const offsetA = useRef(new Animated.Value(0)).current; // 회원가입 A단계 위치
  const offsetB = useRef(new Animated.Value(width)).current; // 회원가입 B단계 위치

  useEffect(() => {
    // 클린업 함수
    return () => {
      initUserInfoData(); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  // 핸드폰 원소 없는 곳을 클릭했을 떄 키보드 숨기는 함수
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const goToTerms = () => {
    navigation.goBack();
  };

  const goToInitHome = () => {
    navigation.replace(AuthRoutes.InitPage);
  };

  const handleSingUp = async () => {
    const isValid = validatePasswordFormat();
    if (!isValid) {
      Alert.alert(
        '오류',
        '비밀번호는 소문자, 대문자, 숫자, 특수문자가 하나 이상 포함되어 있어야 하고 8~16자리로 입력해주시기 바랍니다.'
      );
    } else {
      const statusData = await requestAuthSign(
        userInfo.email,
        userInfo.password,
        userInfo.nickname,
        userInfo.name,
        userInfo.gender,
        userInfo.birthday,
        userInfo.phoneNumber
      );

      if (statusData === 200) {
        goToInitHome();
      } else if (statusData === 400) {
        Alert.alert('안내사항', '이미 가입된 회원입니다.');
        goToInitHome();
      } else {
        Alert.alert(
          '안내사항',
          '시스템 오류가 발생했습니다. 다시 시도해주세요'
        );
      }
    }
  };

  const moveStep = () => {
    Animated.timing(offsetA, {
      toValue: -width,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(offsetB, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // A단계를 -width만큼 왼쪽으로 이동, B단계를 0위치로 이동
  const handleNextA = async () => {
    if (step === 'stepA' && toggleBtn) {
      const statusData = await requestAuthPhoneOtpNumber(
        userInfo.phoneNumber,
        userInfo.otpNumber
      );
      if (statusData === 200) {
        moveStep();
        setToggleBtn(false);
        setStep('stepB');
      } else {
        Alert.alert('인증번호가 일치하지 않습니다.');
      }
    } else {
      if (toggleBtn) {
        handleSingUp();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View
        style={[
          styles.signCon,
          {
            paddingTop: insets.top,
            paddingBottom: 50,
            justifyContent: 'space-between',
            flex: 1,
            flexDirection: 'column',
          },
        ]}
      >
        <View>
          <HeaderLeftButton pressFunc={goToTerms} />

          <View style={styles.stepWrap}>
            <SignupStepA
              setToggleBtn={setToggleBtn}
              setUserInfo={setUserInfo}
              userInfo={userInfo}
              offsetA={offsetA}
            />

            <SignUpStepB offsetB={offsetB} setToggleBtn={setToggleBtn} />
          </View>
        </View>

        <AccountActionButton
          stepAMsg={stepAMsg}
          stepBMsg={stepBMsg}
          handleFunc={handleNextA}
          step={step}
          toggleBtn={toggleBtn}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  signCon: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 30,
  },
  verificationText: {
    fontSize: 17,
    fontWeight: '700',
    color: SELECTBLACK,
  },
  stepWrap: {
    width: '100%',
    flexDirection: 'row',
  },
  otpMsgWrap: {
    gap: 33,
    marginTop: 100,
  },
  otpMsgHideBox: {
    paddingHorizontal: 15,
    height: 40,
  },
  otpMsgInner: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: SELECTBLACK,
    opacity: 0.6,
  },
  otpMsgExternel: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    position: 'absolute',
    left: 15,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtn: {
    height: vScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default SignScreen;
