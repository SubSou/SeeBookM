import { BackHandler, ScrollView, StyleSheet } from 'react-native';
import MainHeaderTitle from './MainHeaderTitle';
import ImageList from './ImageList';
import MainReviewTitle from '../../Common/MainReviewTitle';
import LatesReview from './LatestReview';
import MoreReview from './MoreReview';
import { WHITE } from '../../../color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { HomeFormTypes } from '../../../reducers/HomeScreenReducer';
import { PropTypes } from 'prop-types';

import { useMainContext } from '../../../contexts/MainContext ';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';

const HomeScreenItem = ({ dispatch, homeDatas }) => {
  const { hasAnimated, handleScrollEnd, stopInfiniteScroll } = useMainContext();

  // const hasAnimated = useRef(false); // scroll 이벤트가 발생했을떄 해당 변수가 없으면 계속호출을 해 그런 현상을 방지하기 위해 사용하는 토글 변수
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수

  const navigation = useNavigation();

  const [scrollMode, setScrollMode] = useState('Up'); // 현재 scrollMode가 무엇인지 저장하는 변수

  useEffect(() => {
    hasAnimated.current = false;
  }, [scrollMode, hasAnimated]);

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 호출할 코드

      setScrollMode('Up');
      hasAnimated.current = false;
      return () => {
        // 화면이 블러되었을 때 호출할 코드 (옵션)
        console.log('Screen is unfocused');
      };
    }, [])
  );

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    console.log(contentOffset.y < prevScrollY || contentOffset.y <= 15);
    console.log(scrollMode);
    if (contentOffset.y < prevScrollY || contentOffset.y <= 10) {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Up이면 실행 x
      if (!(scrollMode == 'Up')) {
        setScrollMode('Up');
        stopInfiniteScroll(0);
        updateHomeForm(20);
      }
    } else {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Down이면 실행 x
      if (!(scrollMode == 'Down')) {
        setScrollMode('Down');
        stopInfiniteScroll(50 * 2);
        updateHomeForm(-100);
      }
    }

    // 이전 스크롤 위치 업데이트
    setPrevScrollY(contentOffset.y);
  };

  const updateHomeForm = (value) => {
    dispatch({ type: HomeFormTypes.UPDATE_TAB_BOTTOM, value });
  };

  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  const goToLatestReviewsPage = () => {
    navigation.navigate(MainStackRoutes.LatestReviewDetailPage);
  };

  return (
    <ScrollView
      style={[styles.homeCon, { paddingTop: insets.top }]}
      onScroll={handleScroll}
      onMomentumScrollEnd={handleScrollEnd}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <MainHeaderTitle />
      <ImageList />
      <MainReviewTitle
        title={'최근에 리뷰가 작성됐어요'}
        isIconUse={true}
        pressFunc={goToLatestReviewsPage}
      />
      <LatesReview reviewDatas={homeDatas.newBook} />
      <MainReviewTitle title={'리뷰가 많은 책이에요'} />
      <MoreReview data={homeDatas.bestBook} />
    </ScrollView>
  );
};

HomeScreenItem.propTypes = {
  animatedMoveFAB: PropTypes.func,
  dispatch: PropTypes.func,
};

const styles = StyleSheet.create({
  homeCon: {
    flex: 1,
    backgroundColor: WHITE,
  },

  latestReviewItemWrap: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
  },
  moreReviewItemWrap: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default HomeScreenItem;
