import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FindEmailStepA from '../../Components/Independent/Auth/FindEmailStepA';
import AccountActionButton from '../../Components/Common/AccountActionButton';
import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import FindEmailStepB from '../../Components/Independent/Auth/FindEmailStepB';
import { useNavigation } from '@react-navigation/native';
import { requestFindEmail } from '../../Api/Auth/AuthApi';
import { AuthRoutes } from '../../navigations/routes';
import { useSignUpContext } from '../../contexts/SignUpContext';
import { WHITE } from '../../color';

const FindEmailScreen = () => {
  const { width } = Dimensions.get('window');
  const { userInfo, fadeIn, initUserInfoData, moveStep, isMain } =
    useSignUpContext();

  const navigation = useNavigation();

  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  const [step, setStep] = useState('stepA'); // 현재 회원가입 단계

  const [toggleBtn, setToggleBtn] = useState(false);
  const [toastMsg, setToastMsg] = useState('인증번호가 전송되었어요');
  const [findEmail, setFindEmail] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);

  const stepAMsg = '다음';
  const stepBMsg = isMain ? '돌아기기' : '로그인 화면으로 이동하기';

  const offsetA = useRef(new Animated.Value(0)).current; // 회원가입 A단계 위치
  const offsetB = useRef(new Animated.Value(width)).current; // 회원가입 B단계 위치

  useEffect(() => {
    // 클린업 함수
    return () => {
      initUserInfoData(); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  const goToScreen = () => {
    if (isMain) {
      navigation.goBack();
    } else {
      navigation.navigate(AuthRoutes.LoginPage);
    }
  };

  // 핸드폰 원소 없는 곳을 클릭했을 떄 키보드 숨기는 함수
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const failProcess = (msg) => {
    if (disabledBtn) {
      setDisabledBtn(false);
      setTimeout(() => {
        setDisabledBtn(true);
      }, 8000);
      setToastMsg(msg);
      fadeIn();
    }
  };

  // A단계를 -width만큼 왼쪽으로 이동, B단계를 0위치로 이동
  const handleNextA = async () => {
    if (step === 'stepA' && toggleBtn) {
      const responseData = await requestFindEmail(
        userInfo.phoneNumber,
        userInfo.otpNumber
      );

      if (responseData.status === 200) {
        setFindEmail(responseData.data);
        moveStep(width, offsetA, offsetB);
        setToggleBtn(true);
        setStep('stepB');
      } else if (responseData.status === 'NOT_FOUND_EMAIL') {
        failProcess('찾을 수 없는 이메일 입니다.');
      } else if (
        responseData.status === 'INVALID_VERIFICATION_CODE_EXCEPTION'
      ) {
        failProcess('인증번호가 일치하지 않습니다.');
      } else {
        Alert.alert(
          '안내사항',
          '시스템 오류가 발생했습니다. 조금 있다 다시 시도해 주세요.'
        );
      }
    } else if (step === 'stepB' && toggleBtn) {
      goToScreen();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={[styles.findEmailCon, { paddingTop: insets.top }]}>
        <View>
          <HeaderLeftButton pressFunc={goToScreen} />
          <View style={styles.stepWrap}>
            <FindEmailStepA
              offsetA={offsetA}
              setToggleBtn={setToggleBtn}
              setToastMsg={setToastMsg}
            />
            <FindEmailStepB offsetB={offsetB} findEmail={findEmail} />
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
  );
};

const styles = StyleSheet.create({
  findEmailCon: {
    paddingHorizontal: 30,
    flex: 1,
    paddingBottom: 50,
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    flexDirection: 'column',
  },
  stepWrap: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default FindEmailScreen;
