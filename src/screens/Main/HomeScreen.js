import { View } from 'react-native';

import FAB from '../../Components/Common/FAB';
import HomeScreenItem from '../../Components/Independent/Main/HomeScreenItem';

import { SimpleLineIcons } from '@expo/vector-icons';
import { WHITE } from '../../color';
import { PropTypes } from 'prop-types';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';
import { useCallback, useEffect } from 'react';
import { requestMainReViewDatas } from '../../Api/Main/MainApi';
import { useUserContext } from '../../contexts/UserContext';
import { useMainContext } from '../../contexts/MainContext ';
import { HomeFormTypes } from '../../reducers/HomeScreenReducer';

const HomeScreen = ({ dispatch, homeDatas, setHomeDatas }) => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError, stopInfiniteScroll } =
    useMainContext();
  const route = useRoute();
  const responseData = route.params;

  const goToCameraPage = () => {
    navigation.navigate(MainStackRoutes.CameraPage);
  };

  const fetchData = async () => {
    try {
      const { statusData, ...responseData } = await requestMainReViewDatas(
        user.header
      );
      if (statusData === 200) {
        setHomeDatas(responseData);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 호출할 코드
      stopInfiniteScroll(0);
      dispatch({ type: HomeFormTypes.UPDATE_TAB_BOTTOM, value: 20 });

      return () => {
        // 화면이 블러되었을 때 호출할 코드 (옵션)
        console.log('Screen is unfocused');
      };
    }, [])
  );

  // 라우터에 값을 있을 시 homeData를 불러옴
  useEffect(() => {
    if (route.params) {
      fetchData();
    }
  }, [route.params]);

  if (homeDatas === null) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeScreenItem homeDatas={homeDatas.data} dispatch={dispatch} />

      <FAB
        icon={<SimpleLineIcons name="camera" size={24} color={WHITE} />}
        name="home"
        pressFunc={goToCameraPage}
      />
    </View>
  );
};

HomeScreen.propTypes = {
  dispatch: PropTypes.func,
};

export default HomeScreen;
