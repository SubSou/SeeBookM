import { Alert, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import { useEffect, useState } from 'react';
import { LIGHTGRAY, REDCOLOR, SELECTBLACK } from '../../../color';
import PasswordInput from './../Auth/StepBInputComponet/PasswordInput';
import PasswordChkInput from './../Auth/StepBInputComponet/PasswordChkInput';
import { ReturnKeyTypes } from '../../Common/InputBox';
import { useSignUpContext } from '../../../contexts/SignUpContext';
import { useUserContext } from '../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { requestMainProfileChangePassword } from '../../../Api/Main/MainApi';
import MainSubmitButton from '../../Common/MainSubmitButton';

const activieData = {
  password: { activie: false, displayName: 'password' },
  passwordCheck: { activie: false, displayName: 'passwordCheck' },
};

const ProfilePasswordChangePage = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { userInfo, setUserInfo, validatePasswordFormat } = useSignUpContext();

  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');

  const [passBdColor, setPassBdColor] = useState(LIGHTGRAY);
  const [passChkBdColor, setPassChkBdColor] = useState(LIGHTGRAY);

  const [validInputEle, setValidInputEle] = useState({
    passwordCheck: false,
    passwordFormatChk: false,
  });

  const [toggleBtn, setToggleBtn] = useState(false);

  useEffect(() => {
    if (validInputEle.passwordCheck) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [validInputEle]);

  const goToScreen = () => {
    setUserInfo({
      ...userInfo,
      password: '',
      passwordChk: '',
    });
    navigation.goBack();
  };

  const goToPrev = () => {
    setUserInfo({
      ...userInfo,
      password: '',
      passwordChk: '',
    });
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
        const statusData = await requestMainProfileChangePassword(
          user.header,
          userInfo.password
        );

        if (statusData === 200) {
          Alert.alert(
            '안내사항',
            '비밀번호가 변경되었습니다.',
            [
              {
                text: '확인',
                onPress: () => goToScreen(),
              },
            ],
            { cancelable: false }
          );
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
      <View style={styles.passChCon}>
        <View style={styles.passChTopItemBox}>
          <LeftBtnAndTitleHeader pressFunc={goToPrev} title={'비밀번호 변경'} />
          <PasswordInput
            isActivie={activieData.password}
            returnKeyType={ReturnKeyTypes.NEXT}
            value={password}
            onChangeText={handlePassword}
            bdColor={passBdColor}
            handlePassFocus={handlePassFocus}
            handlePassNonFocus={handlePassNonFocus}
            validInputEle={validInputEle}
            marginTop={58}
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

        <View style={styles.passChBottomItemBox}>
          <MainSubmitButton
            toggleData={toggleBtn}
            msg={'변경하기'}
            pressFunc={handleChangePassword}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  passChCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
    height: '100%',
  },
  passChTopItemBox: {
    height: 600,
  },
  passChBottomItemBox: {},
});

export default ProfilePasswordChangePage;
