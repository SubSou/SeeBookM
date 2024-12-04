import { StyleSheet, View } from 'react-native';
import { WHITE } from '../../color';

import ProfileHeader from '../../Components/Independent/Main/ProfileHeader';

import ProfileMain from '../../Components/Independent/Main/ProfileMain';

import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import { useMainContext } from '../../contexts/MainContext ';
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
const MyProfileScreen = () => {
  const { mainProfileData, setMainProfileData } = useMainContext();

  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setMainProfileData((prevData) => ({
        ...prevData,
        data: {
          ...prevData.data,
          nickname: route.params,
        },
      }));
    }
  }, [route.params]);

  if (mainProfileData === null || mainProfileData.data == null) {
    return <View></View>;
  }

  return (
    <SafeAreaWrapper>
      <View style={[styles.profileCon]}>
        <ProfileHeader mainProfileData={mainProfileData} />
        <ProfileMain />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  profileCon: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default MyProfileScreen;
