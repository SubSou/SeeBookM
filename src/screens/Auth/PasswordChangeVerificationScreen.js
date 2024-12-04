import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import FindEmailStepA from '../../Components/Independent/Auth/FindEmailStepA';
import { useCallback, useEffect, useRef, useState } from 'react';
import AccountActionButton from '../../Components/Common/AccountActionButton';
import {
  requestAuthEmail,
  requestAuthPhoneOtpNumber,
} from '../../Api/Auth/AuthApi';
import { useSignUpContext } from '../../contexts/SignUpContext';

import EmailVerification from '../../Components/Independent/Auth/EmailVerification';
import { screenWidth } from '../../Normalization';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthRoutes } from '../../navigations/routes';

const PasswordChangeVerificationScreen = () => {
  const {
    userInfo,
    moveStep,
    fadeIn,
    initUserInfoData,
    handleSystemError,
    setIsMain,
  } = useSignUpContext();

  const navigation = useNavigation();

  const [step, setStep] = useState('stepA'); // 현재 회원가입 단계

  const [toggleBtn, setToggleBtn] = useState(false);
  const [toastMsg, setToastMsg] = useState('인증번호가 전송되었어요');

  const route = useRoute();
  const responseData = route.params;

  const stepAMsg = '다음';
  const stepBMsg = '다음';

  const offsetA = useRef(new Animated.Value(0)).current; // 회원가입 A단계 위치
  const offsetB = useRef(new Animated.Value(screenWidth)).current; // 회원가입 B단계 위치

  useEffect(() => {
    if (responseData === 'Main') {
      setIsMain(true);
    }

    // 클린업 함수
    return () => {
      initUserInfoData(); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  // 핸드폰 원소 없는 곳을 클릭했을 떄 키보드 숨기는 함수
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const goToChangePasswordPage = () => {
    navigation.replace(AuthRoutes.PasswordChagnePage, userInfo.email);
  };

  const goToBack = () => {
    navigation.goBack();
  };

  const failProcess = (msg) => {
    setToastMsg(msg);
    fadeIn();
  };

  const validateEmail = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|con|net)$/i;

    if (!emailRegex.test(userInfo.email)) {
      return;
    }

    const statusData = await requestAuthEmail(userInfo.email);
    console.log(statusData);
    if (statusData === 200) {
      goToChangePasswordPage();
    } else if (statusData === 400) {
      failProcess('찾을 수 없는 이메일 입니다.');
    } else {
      handleSystemError();
    }
  }, [userInfo.email]);

  // A단계를 -width만큼 왼쪽으로 이동, B단계를 0위치로 이동
  const handleNextA = async () => {
    if (step === 'stepA' && toggleBtn) {
      const responseData = await requestAuthPhoneOtpNumber(
        userInfo.phoneNumber,
        userInfo.otpNumber
      );

      if (responseData === 200) {
        moveStep(screenWidth, offsetA, offsetB);
        setToggleBtn(false);
        setStep('stepB');
      } else {
        handleSystemError();
      }
    } else if (step === 'stepB' && toggleBtn) {
      validateEmail();
    }
  };

  return (
    <SafeAreaWrapper>
      <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <View style={[styles.passwordVerCon]}>
          <View>
            <HeaderLeftButton pressFunc={goToBack} />
            <View style={styles.stepWrap}>
              <FindEmailStepA
                offsetA={offsetA}
                setToggleBtn={setToggleBtn}
                setToastMsg={setToastMsg}
                title="본인인증"
              />
              <EmailVerification
                offsetB={offsetB}
                setToggleBtn={setToggleBtn}
              />
            </View>
          </View>
          <AccountActionButton
            stepAMsg={stepAMsg}
            stepBMsg={stepBMsg}
            handleFunc={handleNextA}
            step={step}
            toggleBtn={toggleBtn}
            toastMsg={toastMsg}
            marginTop={200}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  passwordVerCon: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: 'space-between',

    flexDirection: 'column',
    paddingHorizontal: 30,
  },
});

export default PasswordChangeVerificationScreen;
