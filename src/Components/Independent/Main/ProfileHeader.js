import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  LIGHTGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  REDCOLOR,
  SELECTBLACK,
  SIGNATURECOLOR,
  TERMSAF,
  WHITE,
} from '../../../color';
import { useUserContext } from '../../../contexts/UserContext';
import { scale, vScale } from '../../../Normalization';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';
const levelData = [
  { level: 1, value: 2 },
  { level: 2, value: 5 },
  { level: 3, value: 10 },
  { level: 4, value: 20 },
  { level: 5, value: 30 },
  { level: 6, value: 40 },
  { level: 7, value: 60 },
  { level: 8, value: 80 },
  { level: 9, value: 100 },
  { level: 10, value: 100000000 },
];

const ProfileHeader = React.memo(({ mainProfileData }) => {
  const navigation = useNavigation();
  const suspend = mainProfileData.data.suspend.suspended;
  const endDate = mainProfileData.data.suspend.endDate;

  const profileData = mainProfileData.data;
  console.log(mainProfileData);

  if (mainProfileData == null) {
    return <View></View>;
  }

  const calculatePercentage = () => {
    const data = levelData.find((item) => item.level === profileData.level);
    const totalCountData = {
      totalCount: data.value,
    };

    const percentData = {
      percent:
        Math.round((profileData.levelCount / totalCountData.totalCount) * 100) +
        '%',
    };

    return { ...totalCountData, ...percentData };
  };

  const goToProfileSettingPage = () => {
    navigation.navigate(MainStackRoutes.ProfileSettingPage);
  };

  const goToPasswordVerification = () => {
    navigation.navigate(MainStackRoutes.PasswordVerificationPage);
  };

  const { totalCount, percent } = calculatePercentage();
  return (
    <View style={styles.headerCon}>
      <View style={styles.headerWrap}>
        <View style={styles.headerBox}>
          <View style={styles.headerUserBox}>
            <Pressable onPress={goToProfileSettingPage}>
              <Image
                style={styles.headerImg}
                source={{ uri: profileData.profileImage }}
              />
            </Pressable>
            <View style={styles.headerUserData}>
              {suspend ? (
                <View>
                  <Text style={styles.userSuspendText}>
                    {'활동 정지 ' + endDate}
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <Pressable onPress={goToPasswordVerification}>
                <View style={styles.headerUserNameBox}>
                  <Text style={styles.userNameText}>
                    {profileData.nickname}
                  </Text>
                  <Ionicons name="settings-sharp" size={15} color={TERMSAF} />
                </View>
              </Pressable>

              <Text style={styles.userEmailText}>{profileData.email}</Text>
            </View>
          </View>
          <View style={styles.headerEXPBox}>
            <View style={styles.headerLvBox}>
              <Text style={styles.headerLvText}>
                {'Lv' + profileData.level}
              </Text>
              <Text style={styles.headerXpText}>
                {profileData.levelCount + '/' + totalCount}
              </Text>
            </View>
            <View style={styles.headerXpBarBox}>
              <View style={[styles.headerXpBar, { width: percent }]}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  headerCon: {
    height: '26.5%',
    width: '100%',
    backgroundColor: NEARWHITE,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  headerWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: WHITE,
    elevation: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  headerUserBox: {
    flexDirection: 'row',
    height: 60,
  },
  headerImg: {
    width: 60,
    height: '100%',
    borderRadius: 30,
  },
  headerUserData: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  headerUserNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headerUserSuspendBox: {},
  userSuspendText: {
    color: REDCOLOR,
    fontSize: 12,
  },
  userNameText: {
    fontSize: scale(20),
    color: SELECTBLACK,
    fontWeight: '600',
  },
  userEmailText: {
    fontSize: scale(14),
    color: TERMSAF,
  },
  headerEXPBox: {
    gap: 5,
  },
  headerLvBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLvText: {
    fontSize: scale(14),
    color: SIGNATURECOLOR,
  },
  headerXpText: {
    fontSize: scale(10),
    color: MEDIUMGRAY,
  },
  headerXpBarBox: {
    width: '100%',
    height: vScale(15),
    backgroundColor: LIGHTGRAY,
    borderRadius: 10,
  },
  headerXpBar: {
    height: '100%',
    backgroundColor: SIGNATURECOLOR,
    borderRadius: 10,
  },
});

ProfileHeader.displayName = 'ProfileHeader'; // react.memo를 사용할 떄 밑에 추가

export default ProfileHeader;
