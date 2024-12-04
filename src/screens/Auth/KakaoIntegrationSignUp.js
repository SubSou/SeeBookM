import { Alert, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import StepTitle from '../../Components/Common/StepTitle';
import PasswordChkInput from '../../Components/Independent/Auth/StepBInputComponet/PasswordChkInput';
import PasswordInput from '../../Components/Independent/Auth/StepBInputComponet/PasswordInput';
import NickNameInput from '../../Components/Independent/Auth/StepBInputComponet/NickNameInput';
import { useEffect, useState } from 'react';
import { ReturnKeyTypes } from '../../Components/Common/InputBox';
import { LIGHTBEIGE, LIGHTGRAY, REDCOLOR, SELECTBLACK } from '../../color';
import KakaoEmailArea from '../../Components/Independent/Auth/KakaoEmailArea';
import { useUserContext } from '../../contexts/UserContext';
import {
  requestAuthNickName,
  requestKakaoSignUp,
} from '../../Api/Auth/AuthApi';
import KakaoSignButton from '../../Components/Independent/Auth/KakaoSignButton';
import { useSignUpContext } from '../../contexts/SignUpContext';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../navigations/routes';
const activieData = {
  password: { activie: false, displayName: 'password' },
  passwordCheck: { activie: false, displayName: 'passwordCheck' },
};

const KakaoIntegrationSignUp = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [nickname, setNickName] = useState('');

  const [toggleBtn, setToggleBtn] = useState(false);

  const [passBdColor, setPassBdColor] = useState(LIGHTGRAY);
  const [passChkBdColor, setPassChkBdColor] = useState(LIGHTGRAY);

  const { userInfo, setUserInfo, initUserInfoData, validatePasswordFormat } =
    useSignUpContext();

  console.log(userInfo);

  const [validInputEle, setValidInputEle] = useState({
    passwordCheck: false,
    passwordFormatChk: false,
    nickname: false,
  });

  useEffect(() => {
    // 클린업 함수
    return () => {
      initUserInfoData(); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  useEffect(() => {
    if (validInputEle.passwordCheck && validInputEle.nickname) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [validInputEle]);

  const goToInitHome = () => {
    navigation.replace(AuthRoutes.InitPage);
  };

  const successNickNameData = () => {
    setValidInputEle({ ...validInputEle, nickname: true });
    const successData = {
      msg: '사용할 수 있는 닉네임 입니다.',
      colorData: LIGHTBEIGE,
    };
    return successData;
  };

  const faliNickNameData = () => {
    setValidInputEle({ ...validInputEle, nickname: false });

    const fallData = {
      msg: '사용할 수 없는 닉네임 입니다.',
      colorData: REDCOLOR,
    };
    return fallData;
  };

  const validateNickName = async () => {
    const hangulConsonantVowelRegex = /[\u3131-\u314E\u314F-\u3163]/;
    const startsWithNumber = /^\d/;
    const isAllNumbers = /^\d+$/;

    if (hangulConsonantVowelRegex.test(nickname)) {
      const result = faliNickNameData();
      return result;
    } else if (startsWithNumber.test(nickname) || isAllNumbers.test(nickname)) {
      const result = faliNickNameData();
      return result;
    } else if (nickname.length < 2) {
      Alert.alert(
        '오류',
        '닉네임은 최소 2글자 이상 최대 8글자 이하까지 적어주세요.'
      );
      const result = faliNickNameData();
      return result;
    } else {
      const statusData = await requestAuthNickName(nickname);
      if (statusData === 200) {
        const result = successNickNameData();
        return result;
      } else {
        const result = faliNickNameData();
        return result;
      }
    }
  };

  const handlePassword = (password) => {
    setPassword(password);
    setUserInfo({ ...userInfo, password: password });
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

  const handleNickName = (text) => {
    setNickName(text);
    setUserInfo({ ...userInfo, nickname: text });
    setValidInputEle({ ...validInputEle, nickname: false });
  };

  const handleKakaoSignUp = async () => {
    if (toggleBtn) {
      const isValid = validatePasswordFormat();
      if (!isValid) {
        Alert.alert(
          '오류',
          '비밀번호는 소문자, 대문자, 숫자, 특수문자가 하나 이상 포함되어 있어야 하고 8~16자리로 입력해주시기 바랍니다.'
        );
      } else {
        const statusData = await requestKakaoSignUp(
          userInfo.kakaoId,
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
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.kakaoInteCon}>
        <View style={styles.contentWrap}>
          <HeaderLeftButton />
          <StepTitle title="회원가입" />
          <KakaoEmailArea email={userInfo.email} />
          <PasswordInput
            isActivie={activieData.password}
            value={password}
            onChangeText={handlePassword}
            bdColor={passBdColor}
            handlePassFocus={handlePassFocus}
            handlePassNonFocus={handlePassNonFocus}
            validInputEle={validInputEle}
          />
          <PasswordChkInput
            isActivie={activieData.passwordCheck}
            value={passwordChk}
            onChangeText={handlePasswordChk}
            bdColor={passChkBdColor}
            handlePassFocus={handlePassFocus}
            handlePassNonFocus={handlePassNonFocus}
            validInputEle={validInputEle}
          />
          <NickNameInput
            value={nickname}
            maxLength={8}
            onChangeText={handleNickName}
            validateFunc={validateNickName}
            validInputEle={validInputEle.nickname}
          />
        </View>
        <KakaoSignButton handleFunc={handleKakaoSignUp} toggleBtn={toggleBtn} />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  kakaoInteCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrap: {},
});

export default KakaoIntegrationSignUp;
