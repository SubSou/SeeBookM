import { Pressable, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from './../../../SafeArea/SafeAreaWrapper ';
import HeaderLeftButton from '../../Common/HeaderLeftButton';
import { SELECTBLACK, WHITE } from '../../../color';
import MainProfileTitle from '../../Common/MainProfileTitle';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../../contexts/UserContext';
import { requestMainLogout } from '../../../Api/Main/MainApi';
import { useMainContext } from '../../../contexts/MainContext ';

const LogoutPage = () => {
  const { user, setUser } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const navigation = useNavigation();
  const goBackProfileMain = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    const statusData = await requestMainLogout(user.header, user.data.provider);

    if (statusData === 200) {
      setUser(null);
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.logoutCon}>
        <View style={styles.logoutWrapMain}>
          <HeaderLeftButton pressFunc={goBackProfileMain} />
          <MainProfileTitle msg={'정말 로그아웃 하시겠어요?'} marginTop={30} />
        </View>
        <View style={styles.logoutWrapBtn}>
          <View style={{ flex: 1 }}>
            <MainSubmitButton pressFunc={goBackProfileMain} msg={'취소'} />
          </View>

          <View style={{ width: 10, height: '100%' }}></View>

          <View style={{ flex: 1 }}>
            <MainSubmitButton
              pressFunc={handleLogout}
              toggleData={true}
              msg={'로그아웃'}
            />
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  logoutCon: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: WHITE,
  },
  logoutTextBox: {
    marginTop: 30,
  },
  logoutText: {
    color: SELECTBLACK,
  },
  logoutWrapMain: {},
  logoutWrapBtn: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default LogoutPage;
