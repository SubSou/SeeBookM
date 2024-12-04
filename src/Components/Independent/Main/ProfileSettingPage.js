import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import SafeAreaWrapper from '../../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import { vScale } from '../../../Normalization';
import { useMainContext } from '../../../contexts/MainContext ';
import { SELECTBLACK, SIGNATURECOLOR, WHITE } from '../../../color';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';
import MainSubmitButton from '../../Common/MainSubmitButton';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';
import { requestMainProfileChangeImage } from './../../../Api/Main/MainApi';
import { useUserContext } from '../../../contexts/UserContext';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const ProfileSettingPage = () => {
  const {
    mainProfileData,
    setMainProfileData,
    handleTokenExpiry,
    handleSystemError,
  } = useMainContext();

  const { user } = useUserContext();
  const navigation = useNavigation();
  const { params } = useRoute();

  const [profileUri, setProfileUri] = useState(
    mainProfileData.data.profileImage
  );

  const goToProfileChoice = () => {
    navigation.navigate(MainStackRoutes.ImagePickerPage);
  };

  const goToBack = (chUri = '') => {
    if (chUri != '') {
      setMainProfileData({
        ...mainProfileData,
        data: {
          ...mainProfileData.data,
          profileImage: chUri,
        },
      });
    }

    navigation.goBack();
  };

  useEffect(() => {
    if (params) {
      const { selectedPhotos } = params;
      if (selectedPhotos?.length) {
        setProfileUri(selectedPhotos[0].uri);
      }
    }
  }, [params]);

  const handleImageChange = async () => {
    if (params) {
      const { selectedPhotos } = params;
      const fileUri = selectedPhotos[0].uri;

      // 이미지 크기 줄이기
      const resizedImage = await ImageManipulator.manipulateAsync(
        fileUri,
        [{ resize: { width: 800 } }], // 원하는 크기로 조정
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const image = {
        uri: resizedImage.uri,
        name: selectedPhotos[0].filename,
        type: 'image/jpeg',
      };

      const status = await requestMainProfileChangeImage(user.header, image);

      if (status === 200) {
        goToBack(selectedPhotos[0].uri);
      } else if (status === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } else {
      goToBack();
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.settingCon}>
        <View style={styles.settingWrap}>
          <View style={styles.settingHeaderBox}>
            <LeftBtnAndTitleHeader title={'프로필 사진 설정'} />
          </View>
          <View style={styles.settingMainWrap}>
            <View style={styles.settingMainImageBox}>
              <Svg height="100%" width="100%" style={styles.svgOverlay}>
                <Defs>
                  <Mask id="mask" x="0" y="0" height="100%" width="100%">
                    <Rect height="100%" width="100%" fill="#fff" />
                    <Circle r="133" cx="50%" cy="50%" fill="#000" />
                  </Mask>
                </Defs>
                <Rect
                  height="100%"
                  width="100%"
                  fill="rgba(0, 0, 0, 0.4)"
                  mask="url(#mask)"
                />
              </Svg>
              <View style={{ width: '100%', height: 22 }}></View>
              <Image
                style={styles.settingMainImage}
                source={{ uri: profileUri }}
              />
              <View style={{ width: '100%', height: 22 }}></View>
            </View>
          </View>
        </View>
        <View style={styles.settingWrapBtn}>
          <View style={{ flex: 1 }}>
            <MainSubmitButton
              pressFunc={handleImageChange}
              toggleData={true}
              msg={'확인'}
            />
          </View>

          <View style={{ width: 10, height: '100%' }}></View>

          <View style={{ flex: 1 }}>
            <Pressable onPress={goToProfileChoice}>
              <View style={styles.settingOkBtn}>
                <Text style={{ color: SIGNATURECOLOR }}>선택</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  settingCon: {
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  settingWrap: {},
  settingHeaderBox: {
    paddingHorizontal: 30,
  },
  settingMainWrap: {
    width: '100%',
    height: 312,
    marginTop: 29,
  },
  settingMainImageBox: {
    width: '100%',
    height: 312,
    position: 'relative',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  settingMainImage: {
    width: '100%',
    height: 269,
    resizeMode: 'cover',
  },
  settingWrapBtn: {
    flexDirection: 'row',

    paddingHorizontal: 30,
  },
  settingOkBtn: {
    width: '100%',
    height: vScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: SIGNATURECOLOR,
  },
});

export default ProfileSettingPage;
