import { Alert, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from './../../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from './../../Common/LeftBtnAndTitleHeader';
import { useNavigation } from '@react-navigation/native';
import ChangeNickNameInput from './ChangeNickNameInput';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { useEffect, useState } from 'react';
import { LIGHTGRAY, REDCOLOR, SIGNATURECOLOR } from '../../../color';
import {
  reqeustMainProfileNicknameVerification,
  requestMainProfileNickNameChange,
} from '../../../Api/Main/MainApi';
import { useUserContext } from '../../../contexts/UserContext';
import { useMainContext } from '../../../contexts/MainContext ';
import { MainTabRoutes } from '../../../navigations/routes';

const ProfileNickNameChangePage = () => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const navigation = useNavigation();

  const goToprev = () => {
    navigation.goBack();
  };

  const [toggleData, setToggleData] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [borderColor, setBorderColor] = useState(LIGHTGRAY);
  const [errColor, setErrColor] = useState('');
  const [text, setText] = useState('');

  const handleNickNameVerification = async () => {
    const statusData = await reqeustMainProfileNicknameVerification(
      user.header,
      text
    );
    console.log(statusData);
    if (statusData === 200) {
      setErrMsg('사용할 수 있는 닉네임 이에요');
      setErrColor(SIGNATURECOLOR);
      setToggleData(true);
    } else if (statusData === 400) {
      setErrMsg('동일한 닉네임이 존재해요');
      setBorderColor(REDCOLOR);
      setErrColor(REDCOLOR);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleChangeNickName = async () => {
    if (toggleData) {
      const statusData = await requestMainProfileNickNameChange(
        user.header,
        text
      );
      if (statusData === 200) {
        Alert.alert(
          '안내사항',
          '닉네임이 변경되었습니다.',
          [
            {
              text: '확인',
              onPress: () =>
                navigation.navigate(MainTabRoutes.MyProfilePage, text),
            },
          ],
          { cancelable: false }
        );
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  useEffect(() => {
    setErrMsg('');
    setToggleData(false);
    setBorderColor(LIGHTGRAY);
  }, [text]);

  const handleNickName = (text) => {
    setText(text);
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.changeCon}>
        <View style={styles.changeTopItemBox}>
          <LeftBtnAndTitleHeader
            pressFunc={goToprev}
            title={'닉네임 변경'}
            fontSize={19}
          />
          <ChangeNickNameInput
            errMsg={errMsg}
            borderColor={borderColor}
            errColor={errColor}
            handleNickNameVerification={handleNickNameVerification}
            value={text}
            onChangeText={handleNickName}
          />
        </View>

        <MainSubmitButton
          toggleData={toggleData}
          msg={'변경하기'}
          pressFunc={handleChangeNickName}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  changeCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-between',
    height: '100%',
  },
  changeTopItemBox: {
    height: 600,
  },
  changeBottomItemBox: {},
});

export default ProfileNickNameChangePage;
