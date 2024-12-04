import { Animated, Easing, ScrollView, StyleSheet } from "react-native";
import ImageList from "../../Components/Independent/Main/ImageList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState } from "react";
import MainReviewTitle from "../../Components/Common/MainReviewTitle";
import MainHeaderTitle from "../../Components/Independent/Main/MainHeaderTitle";
import LatesReview from "../../Components/Independent/Main/LatestReview";
import MoreReview from "../../Components/Independent/Main/MoreReview";
import { WHITE } from "../../color";
import FAB from "../../Components/Common/FAB";
import { scale, vScale } from "../../Normalization";

const HomeScreen = ({ setIsBTabActivie }) => {
  const dummyData = [];

  const transFABY = useRef(new Animated.Value(scale(0))); // FAB가 X값으로 움직이는 변수
  const hasAnimated = useRef(false); // scroll 이벤트가 발생했을떄 해당 변수가 없으면 계속호출을 해 그런 현상을 방지하기 위해 사용하는 토글 변수
  const [loadingMore, setLoadingMore] = useState(false);

  const [screenNowY, setScreenNowY] = useState(0); // 스크롤이 발생했을 때 계속 값을 변경해줄 상태 변수
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수

  const [FABY, setFABY] = useState(vScale(600)); // 초기 FAB Y값을 지정

  for (let i = 1; i <= 30; i++) {
    dummyData.push({
      id: i,
      imageUrl: require("../../../assets/home-clock.png"), // 이미지 경로 예시: '../../assets/book_1.png'
      bookName: `Book ${i}`,
      publisher: `Publisher ${i}`,
      rating: 4.5 + i * 0.1, // 각 데이터에 대해 약간씩 다른 별점 부여
      ratingCount: 1000 + i * 50, // 각 데이터에 대해 약간씩 다른 별점 갯수 부여
      userName: `User ${i}`,
      userComment: `Comment ${i}`,
    });
  }

  const [data, setData] = useState(dummyData.slice(0, 10));

  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (contentOffset.y === 0) {
      handleScrollEnd();
    } else {
      setIsBTabActivie(-layoutMeasurement.height);

      if (!hasAnimated.current) {
        hasAnimated.current = true;
        animatedMoveFAB(scale(50 * 2));
      }

      setScreenNowY(Math.round(contentOffset.y + 600));

      if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
        // 스크롤이 화면 하단에 도달하면 추가 데이터를 로드합니다.
        console.log("호출");
        loadMoreData();
      }
    }
  };

  const handleScrollEnd = () => {
    setIsBTabActivie(20);
    setFABY(screenNowY);
    animatedMoveFAB(scale(0));
    hasAnimated.current = false;
  };

  const loadMoreData = () => {
    if (loadingMore) return; // 중복 호출 방지

    setLoadingMore(true); // 로딩 플래그를 true로 설정

    // 추가적인 10개의 아이템을 생성하여 기존 데이터에 추가합니다.
    const newData = [
      ...data,
      ...dummyData.slice(data.length, data.length + 10),
    ];
    setData((prevData) => {
      console.log(newData.length);
      setLoadingMore(false); // 로딩 플래그를 초기화
      return newData;
    });
  };

  const animatedMoveFAB = (toValue) => {
    Animated.timing(transFABY.current, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  return (
    <ScrollView
      style={[styles.homeCon, { paddingTop: insets.top }]}
      onScroll={handleScroll}
      onMomentumScrollEnd={handleScrollEnd}
    >
      <MainHeaderTitle />
      <ImageList />
      <MainReviewTitle title={"최근에 리뷰가 작성됐어요"} isIconUse={true} />
      <LatesReview />
      <MainReviewTitle title={"리뷰가 많은 책이에요"} />
      <MoreReview data={data} />
      <FAB FABY={FABY} transFABY={transFABY} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeCon: {
    flex: 1,
    backgroundColor: WHITE,
  },

  latestReviewItemWrap: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: "row",
  },
  moreReviewItemWrap: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
