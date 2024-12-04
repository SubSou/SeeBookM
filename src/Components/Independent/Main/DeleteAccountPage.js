import { StyleSheet, Text, View, Animated, Alert } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Common/HeaderLeftButton';
import MainProfileTitle from '../../Common/MainProfileTitle';
import DeleteSubInfo from './DeleteSubInfo';
import DeleteInput from './DeleteInput';
import DeleteFindPassword from './DeleteFindPassword';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../../navigations/routes';
import { requestMainDeleteAccount } from '../../../Api/Main/MainApi';
import { useUserContext } from '../../../contexts/UserContext';
import { requestMainProfilePasswordValidation } from './../../../Api/Main/MainApi';
import { useMainContext } from '../../../contexts/MainContext ';
import { SELECTBLACK, WHITE } from '../../../color';

const DeleteAccountPage = () => {
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

  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleDelete = async () => {
    if (toggleData) {
      const validationStatusData = await requestMainProfilePasswordValidation(
        user.header,
        password
      );

      if (validationStatusData === 200) {
        const deleteAccoutStatusData = await requestMainDeleteAccount(
          user.header,
          user.data.provider
        );

        if (deleteAccoutStatusData === 200) {
          Alert.alert(
            '안내사항',
            '회원탈퇴가 성공적으로 이루어졌습니다.',
            [
              {
                text: '확인',
                onPress: () => setUser(null),
              },
            ],
            { cancelable: false }
          );
        } else if (deleteAccoutStatusData === 401) {
          handleTokenExpiry();
        } else {
          handleSystemError();
        }
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
    <SafeAreaWrapper>
      <View style={styles.deleteCon}>
        <View style={styles.deleteWrapMain}>
          <HeaderLeftButton pressFunc={goBackProfileMain} />
          <MainProfileTitle marginTop={30} msg={'떠나신다니 아쉬워요'} />
          <DeleteSubInfo />
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
            marginTop={200}
            toggleData={toggleData}
            msg={'탈퇴하기'}
            pressFunc={handleDelete}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  deleteCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
    flex: 1,
  },
  deleteWrapMain: {},
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

export default DeleteAccountPage;
