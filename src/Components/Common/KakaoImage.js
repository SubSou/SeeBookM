import { Image, Linking, Pressable, StyleSheet } from 'react-native';
import { authModeTypes } from '../../mode';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../navigations/routes';

const KakaoImage = ({ type }) => {
  const navigation = useNavigation();
  const goToKakaoWeb = () => {
    navigation.navigate(AuthRoutes.KakaoWebViewPage);
  };

  return (
    <Pressable
      style={[
        styles.kakaoImage,
        { marginTop: type === authModeTypes.INIT ? 30 : 20 },
      ]}
      onPress={goToKakaoWeb}
    >
      <Image
        style={styles.kakaoImage}
        source={require('../../../assets/kakao_login.png')}
      ></Image>
    </Pressable>
  );
};
export default React.memo(KakaoImage);

const styles = StyleSheet.create({
  kakaoImage: {
    width: '100%',
    height: 45,
    backgroundColor: '#FAFAFA',
  },
});
