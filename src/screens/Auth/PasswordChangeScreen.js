import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import { Alert, StyleSheet, View } from 'react-native';
import PasswordInput from '../../Components/Independent/Auth/StepBInputComponet/PasswordInput';
import PasswordChkInput from '../../Components/Independent/Auth/StepBInputComponet/PasswordChkInput';
import { ReturnKeyTypes } from '../../Components/Common/InputBox';
import StepTitle from '../../Components/Common/StepTitle';
import { LIGHTGRAY, REDCOLOR, SELECTBLACK } from '../../color';
import { useSignUpContext } from '../../contexts/SignUpContext';
import PasswordChangeBtn from '../../Components/Independent/Auth/PasswordChangeBtn';
import { requestAuthChangePassword } from '../../Api/Auth/AuthApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthRoutes, MainStackRoutes } from '../../navigations/routes';
import { requestMainProfileChangePassword } from '../../Api/Main/MainApi';
import { useUserContext } from '../../contexts/UserContext';
const activieData = {
  email: { activie: false, displayName: 'email' },
  password: { activie: false, displayName: 'password' },
  passwordCheck: { activie: false, displayName: 'passwordCheck' },
  name: { activie: false, displayName: 'name' },
};

const PasswordChangeScreen = React.memo(() => {
  const {
    userInfo,
    setUserInfo,
    initUserInfoData,
    validatePasswordFormat,
    isMain,
  } = useSignUpContext();

  const navigation = useNavigation();

  const route = useRoute();
  const responseData = route.params;

  const [toggleBtn, setToggleBtn] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');

  const [passBdColor, setPassBdColor] = useState(LIGHTGRAY);
  const [passChkBdColor, setPassChkBdColor] = useState(LIGHTGRAY);

  const [validInputEle, setValidInputEle] = useState({
    passwordCheck: false,
    passwordFormatChk: false,
  });

  useEffect(() => {
    if (validInputEle.passwordCheck) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [validInputEle]);

  useEffect(() => {
    // 클린업 함수
    return () => {
      initUserInfoData(); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  const goToBack = () => {
    navigation.goBack();
  };

  const goToScreen = () => {
    navigation.goBack();
  };

  const handleChangePassword = async () => {
    if (toggleBtn) {
      const isValid = validatePasswordFormat();
      if (!isValid) {
        Alert.alert(
          '오류',
          '비밀번호는 소문자, 대문자, 숫자, 특수문자가 하나 이상 포함되어 있어야 하고 8~16자리로 입력해주시기 바랍니다.'
        );
      } else {
        let statusData;

        if (isMain) {
          const { user } = useUserContext();
          statusData = await requestMainProfileChangePassword(
            user.header,
            userInfo.password
          );
        } else {
          statusData = await requestAuthChangePassword(
            responseData,
            userInfo.password
          );
        }

        if (statusData === 200) {
          goToScreen();
        } else {
          Alert.alert(
            '안내사항',
            '시스템 오류가 발생했습니다. 다시 시도해주세요'
          );
        }
      }
    }
  };

  const handlePassword = (password) => {
    setPassword(password);
    setUserInfo({
      ...userInfo,
      password: password,
    });

    if (passwordChk.length != 0 && password.length != 0) {
      if (password == passwordChk) {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: true,
        });
        setPassBdColor(SELECTBLACK);
        setPassChkBdColor(LIGHTGRAY);
      } else {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: false,
        });
        setPassBdColor(REDCOLOR);
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      setPassBdColor(SELECTBLACK);
      setPassChkBdColor(LIGHTGRAY);
    }
  };

  const handlePasswordChk = (passwordChk) => {
    setPasswordChk(passwordChk);

    setUserInfo({
      ...userInfo,
      passwordChk: passwordChk,
    });

    if (passwordChk.length != 0 && password.length != 0) {
      if (password == passwordChk) {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: true,
        });
        setPassBdColor(LIGHTGRAY);
        setPassChkBdColor(SELECTBLACK);
      } else {
        setValidInputEle({
          ...validInputEle,
          passwordCheck: false,
        });
        setPassBdColor(REDCOLOR);
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      setPassBdColor(LIGHTGRAY);
      setPassChkBdColor(SELECTBLACK);
    }
  };

  const handlePassFocus = (target) => {
    if (
      passwordChk.length != 0 &&
      password.length != 0 &&
      password !== passwordChk
    ) {
      if (target === 'password') {
        setPassBdColor(REDCOLOR);
      } else {
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      if (target === 'password') {
        setPassBdColor(SELECTBLACK);
      } else {
        setPassChkBdColor(SELECTBLACK);
      }
    }
  };

  const handlePassNonFocus = (target) => {
    if (
      passwordChk.length != 0 &&
      password.length != 0 &&
      password !== passwordChk
    ) {
      if (target === 'password') {
        setPassBdColor(REDCOLOR);
      } else {
        setPassChkBdColor(REDCOLOR);
      }
    } else {
      if (target === 'password') {
        setPassBdColor(LIGHTGRAY);
      } else {
        setPassChkBdColor(LIGHTGRAY);
      }
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.passwordChCon}>
        <View style={styles.chTopBox}>
          <HeaderLeftButton pressFunc={goToBack} />
          <StepTitle title="비밀번호를 다시 설정해주세요!" />
          <PasswordInput
            isActivie={activieData.password}
            returnKeyType={ReturnKeyTypes.NEXT}
            value={password}
            onChangeText={handlePassword}
            bdColor={passBdColor}
            handlePassFocus={handlePassFocus}
            handlePassNonFocus={handlePassNonFocus}
            validInputEle={validInputEle}
          />

          <PasswordChkInput
            isActivie={activieData.passwordCheck}
            returnKeyType={ReturnKeyTypes.NEXT}
            value={passwordChk}
            onChangeText={handlePasswordChk}
            bdColor={passChkBdColor}
            handlePassFocus={handlePassFocus}
            handlePassNonFocus={handlePassNonFocus}
            validInputEle={validInputEle}
          />
        </View>
        <View style={styles.chBottomBox}>
          <PasswordChangeBtn
            handleChangePassword={handleChangePassword}
            toggleBtn={toggleBtn}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
});

PasswordChangeScreen.displayName = 'PasswordChangeScreen'; // react.memo를 사용할 떄 밑에 추가

const styles = StyleSheet.create({
  passwordChCon: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  chTopBox: {},
  chBottomBox: {},
});

export default PasswordChangeScreen;
