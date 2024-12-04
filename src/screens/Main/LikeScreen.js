import { ScrollView, View } from "react-native";
import { WHITE } from "../../color";
import LikeHeader from "../../Components/Independent/Main/LikeHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EdgeBooks from "../../Components/Common/EdgeBooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { HomeFormTypes } from "../../reducers/HomeScreenReducer";
import { PropTypes } from "prop-types";
import { useMainContext } from "../../contexts/MainContext ";
import SafeAreaWrapper from "../../SafeArea/SafeAreaWrapper ";
import LikeNoItem from "../../Components/Independent/Main/LikeNoItem";
import { useUserContext } from "../../contexts/UserContext";
import { requestMainWishListGet } from "../../Api/Main/MainApi";
import { useFocusEffect, useRoute } from "@react-navigation/native";

const LikeScreen = ({ dispatch, wishListData, setWishListData }) => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const { hasAnimated, handleScrollEnd } = useMainContext();
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수
  const [scrollMode, setScrollMode] = useState(true); // 현재 scrollMode가 무엇인지 저장하는 변수

  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); // 처음에는 로딩 중으로 설정
  const [currentPage, setCurrentPage] = useState(1);

  const [updateIsbnData, setUpdateIsbnData] = useState(null);

  // ScrollView의 ref 생성
  const scrollViewRef = useRef(null);

  const route = useRoute();

  useEffect(() => {
    hasAnimated.current = false;
  }, [scrollMode, hasAnimated]);

  const handleIsbnData = async (isbn) => {
    setUpdateIsbnData(isbn);
  };

  useEffect(() => {
    if (route.params) {
      const { bookData, wishedData, reviewCount } = route.params; // `route.params`에서 `bookData` 객체를 추출합니다.

      const { avgStar, totalReviewCount, wishlistCount, bookId, wished } =
        bookData; // `bookData`에서 필요한 값들을 추출합니다.

      if (wishedData) {
        // wished가 true인 경우, data 배열에서 해당 item을 찾아 업데이트합니다.
        setData((prevData) =>
          prevData.map((item) =>
            item.bookId === bookId
              ? {
                  ...item,
                  avgStar,
                  totalReviewCount: reviewCount,
                  wishlistCount,
                }
              : item
          )
        );
      } else {
        // wished가 false인 경우, data 배열에서 해당 item을 제거합니다.
        setData((prevData) =>
          prevData.filter((item) => item.bookId !== bookId)
        );
      }
    }
  }, [route.params]);

  useEffect(() => {
    // wishListData가 있을 때만 데이터 설정
    if (wishListData && wishListData.data && wishListData.data.book) {
      setData(wishListData.data.book);
      setDataLoading(false); // 데이터가 로드되면 로딩 상태를 false로 설정
    }
  }, [wishListData]);

  useFocusEffect(
    useCallback(() => {
      if (updateIsbnData) {
      }

      // 화면이 언포커싱 될 때 호출 (clean up)
      return () => {};
    }, [])
  );

  const loadMoreData = async () => {
    // 추가적인 10개의 아이템을 생성하여 기존 데이터에 추가합니다.

    const { statusData, ...responseData } = await requestMainWishListGet(
      user.header,
      currentPage + 1
    );

    if (statusData === 200) {
      setData([...data, ...responseData.data.book]);
      setCurrentPage(currentPage + 1);
    } else if (statusData === 400) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const updateHomeForm = (value) => {
    dispatch({ type: HomeFormTypes.UPDATE_TAB_BOTTOM, value });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (currentPage < wishListData.data.endPage) {
      // 스크롤이 화면 하단에 도달하면 추가 데이터를 로드합니다.
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 50
      ) {
        loadMoreData();
      }
    }

    if (contentOffset.y < prevScrollY || contentOffset.y <= 0) {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Up이면 실행 x
      if (!(scrollMode == "Up")) {
        setScrollMode("Up");
        updateHomeForm(20);
      }
    } else {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Down이면 실행 x
      if (!(scrollMode == "Down")) {
        setScrollMode("Down");
        updateHomeForm(-100);
      }
    }

    setPrevScrollY(contentOffset.y);
  };

  // 문제를 유발하지 않도록 훅을 최상단에 유지한 후 조건문 추가
  if (dataLoading) {
    return <View></View>;
  }

  return (
    <SafeAreaWrapper>
      <View
        style={{
          flex: 1,
          backgroundColor: WHITE,
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
        >
          <LikeHeader />
          {!dataLoading ? (
            <EdgeBooks data={data} handleIsbnData={handleIsbnData} />
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

LikeScreen.propTypes = {
  dispatch: PropTypes.func,
};

export default LikeScreen;
