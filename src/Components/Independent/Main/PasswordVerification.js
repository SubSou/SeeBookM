import {
  StyleSheet,
  Text,
  View,
  Animated,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Common/HeaderLeftButton';
import MainProfileTitle from '../../Common/MainProfileTitle';
import DeleteSubInfo from './DeleteSubInfo';
import DeleteInput from './DeleteInput';
import DeleteFindPassword from './DeleteFindPassword';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes, MainStackRoutes } from '../../../navigations/routes';
import { requestMainDeleteAccount } from '../../../Api/Main/MainApi';
import { useUserContext } from '../../../contexts/UserContext';
import { requestMainProfilePasswordValidation } from './../../../Api/Main/MainApi';
import { useMainContext } from '../../../contexts/MainContext ';
import { SELECTBLACK, WHITE } from '../../../color';

const PasswordVerification = () => {
  const [toggleData, setToggleData] = useState(false);
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current; // 초기 투명도는 0, DeleteAccountPage에서 탈퇴하기를 눌럿을 때 opacity를 애니메이션 조절해주는 변수

  const { user, setUser } = useUserContext();
  const { handleSystemError, handleTokenExpiry } = useMainContext();

  const navigation = useNavigation();

  useEffect(() => {
    if (password.length < 1) {
      setToggleData(false);
    } else {
      setToggleData(true);
    }
  }, [password]);

  const fadeIn = () => {
    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // 애니메이션 지속 시간 (밀리초 단위)
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    // 3초 후 페이드 아웃 애니메이션
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 애니메이션 지속 시간 (밀리초 단위)
        useNativeDriver: true,
      }).start();
    }, 3000); // 3초 후 실행
  };

  const goBackProfileMain = () => {
    navigation.goBack();
  };

  const goToChVerification = () => {
    navigation.navigate(AuthRoutes.PasswordChangeVerificationPage, 'Main');
  };

  const goToProfileEditOptions = () => {
    navigation.navigate(MainStackRoutes.ProfileEditOptionsPage);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleDelete = async () => {
    console.log('터치');
    if (toggleData) {
      const validationStatusData = await requestMainProfilePasswordValidation(
        user.header,
        password
      );

      if (validationStatusData === 200) {
        goToProfileEditOptions();
      } else if (validationStatusData === 400) {
        fadeIn();
      } else if (validationStatusData === 401) {
        handleTokenExpiry();
      } else if (validationStatusData === 500) {
        handleSystemError();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <SafeAreaWrapper>
          <View style={styles.deleteCon}>
            <View style={styles.deleteWrapMain}>
              <HeaderLeftButton pressFunc={goBackProfileMain} />
              <DeleteSubInfo msg="비밀번호를 입력해주세요" />
              <DeleteInput value={password} onChangeText={handlePassword} />
              <DeleteFindPassword pressFunc={goToChVerification} />
            </View>
            <View style={[styles.deleteWrapBtn]}>
              <Animated.View
                style={[styles.toastMsgHideBox, { opacity: fadeAnim }]}
              >
                <View style={styles.toastMsgExternel}>
                  <Text style={{ color: WHITE }}>
                    비밀번호가 일치하지 않습니다.
                  </Text>
                </View>

                <View style={styles.toastMsgInner}></View>
              </Animated.View>
              <MainSubmitButton
                toggleData={toggleData}
                msg={'확인'}
                pressFunc={handleDelete}
              />
            </View>
          </View>
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  deleteCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
    height: '100%',
  },
  deleteWrapMain: {
    height: 500,
  },
  deleteWrapBtn: {
    width: '100%',

    position: 'relative',
  },
  toastMsgHideBox: {
    width: '100%',
    height: 40,
    position: 'absolute',
    bottom: 83,
  },
  toastMsgExternel: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    zIndex: 1000,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastMsgInner: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: SELECTBLACK,
    opacity: 0.6,
  },
});

export default PasswordVerification;
