import { Alert, View } from 'react-native';

import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import WebView from 'react-native-webview';
import { requestKakaoLogin } from './../../Api/Auth/AuthApi';
import { useEffect, useState } from 'react';
import { WHITE } from './../../color';
import { useSignUpContext } from './../../contexts/SignUpContext';
import { useNavigation } from '@react-navigation/native';
import { AuthRoutes } from '../../navigations/routes';

const INJECTED_JAVASCRIPT = `
  setTimeout(() => {
    console.log('JavaScript code executed');
    window.ReactNativeWebView.postMessage('CHECK!');
  }, 1000);
`;

const uri =
  'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5e44324a700c1117fe9b5e9ad20383b3&redirect_uri=http://localhost:3000/kakao/callback&response_type=code';

const KakaoWebView = () => {
  const [isLoadingPrev, setIsLoadingPrev] = useState(true);
  const [handledUrl, setHandledUrl] = useState(null); // 처리된 URL 상태 추가
  const navigation = useNavigation();
  const [showWebView, setShowWebView] = useState(true); // WebView 표시 상태 추가

  const goToKakaoIntegration = () => {
    setShowWebView(false);
    navigation.navigate(AuthRoutes.KakaoIntegrationPage);
  };

  useEffect(() => {
    // 클린업 함수
    return () => {
      setShowWebView(false);
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  useEffect(() => {
    console.log(isLoadingPrev);
  }, [isLoadingPrev]); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  const { userInfo, setUserInfo, handleUser } = useSignUpContext();

  const handleWebViewNavigationStateChange = async (event) => {
    setIsLoadingPrev(true);
    const data = event.url;

    const regex = /[?&]code=([^&#]*)/;
    const urlResults = regex.exec(data);

    if (urlResults === null) {
      setIsLoadingPrev(false);
      return;
    } else {
      const code = urlResults[1];

      if (handledUrl === code) {
        setIsLoadingPrev(true);
        return;
      }

      setIsLoadingPrev(true);

      const { statusData, ...responseData } = await requestKakaoLogin(
        urlResults[1]
      );

      if (statusData === 200) {
        if (responseData.data.success) {
          handleUser(responseData);
        } else {
          setUserInfo({ ...userInfo, ...responseData.data });

          goToKakaoIntegration();
          setIsLoadingPrev(true);
        }
      }

      setHandledUrl(code); // 처리된 URL 업데이트
    }
  };
  return (
    <SafeAreaWrapper>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: WHITE,
            zIndex: isLoadingPrev ? 999 : 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></View>

        {showWebView && (
          <WebView
            source={{ uri }}
            style={{ flex: 1, zIndex: 99 }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            javaScriptEnabled={true}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            ignoreSslError={true}
            ignoreWarning={true}
          />
        )}
      </View>
    </SafeAreaWrapper>
  );
};

export default KakaoWebView;
