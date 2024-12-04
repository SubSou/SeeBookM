import { Alert, Pressable, View, useWindowDimensions } from 'react-native';

import { AuthRoutes } from '../../navigations/routes';
import { AuthFormat } from '../../Styles/AuthFormat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { authModeTypes } from '../../mode';
import IconImage from '../../Components/Common/IconImage';
import KakaoImage from '../../Components/Common/KakaoImage';
import InitRecentReviews from '../../Components/Independent/Auth/InitRecentReviews';
import InitEmailLogin from '../../Components/Independent/Auth/InitEmailLogin';
import OrText from '../../Components/Common/OrText';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import { requestLatestReviewList } from '../../Api/Auth/AuthApi';
import { useSignUpContext } from '../../contexts/SignUpContext';

const InitScreen = React.memo(({ navigation }) => {
  const [reviewDatas, setReviewDatas] = useState([]);
  const { handleSystemError } = useSignUpContext();

  const goToLoginPage = () => {
    navigation.navigate(AuthRoutes.LoginPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { statusData, ...responseData } = await requestLatestReviewList();
        console.log(responseData.data.review);

        if (statusData === 200) {
          setReviewDatas(responseData.data.review);
        } else if (statusData === 500) {
          handleSystemError();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 비동기 함수 호출
    fetchData();
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={AuthFormat.container}>
        <IconImage />
        <InitRecentReviews reviewDatas={reviewDatas} />
        <KakaoImage type={authModeTypes.INIT} />
        <OrText type={authModeTypes.INIT} />
        <Pressable onPress={goToLoginPage}>
          <InitEmailLogin />
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
});

InitScreen.displayName = 'InitScreen'; // react.memo를 사용할 떄 밑에 추가

InitScreen.propTypes = {
  navigation: PropTypes.object,
};

export default InitScreen;
