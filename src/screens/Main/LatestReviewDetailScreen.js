import { ScrollView, StyleSheet, View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { requestMainLatestReviewsGet } from '../../Api/Main/MainApi';
import { useUserContext } from '../../contexts/UserContext';
import { useMainContext } from '../../contexts/MainContext ';
import EdgeBooks from '../../Components/Common/EdgeBooks';
import LatestReviewDetailSuccess from '../../Components/Independent/Main/LatestReviewDetailSuccess';
import DetailFail from '../../Components/Common/DetailFail';

const LatestReviewDetailScreen = () => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();
  const route = useRoute();

  const navigation = useNavigation();

  const [latestDatas, setLatestDatas] = useState(null);
  const [updateIsbnData, setUpdateIsbnData] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [bookEndPage, setBookEndPage] = useState(null);

  const goToPrev = () => {
    navigation.goBack();
  };

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const { statusData, ...responseData } =
          await requestMainLatestReviewsGet(user.header, 1);
        if (statusData === 200) {
          setLatestDatas(responseData.data.book);
          setBookEndPage(responseData.data.endPage);
        } else if (statusData === 401) {
          handleTokenExpiry();
        } else {
          handleSystemError();
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 비동기 함수 호출
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { bookData } = route.params;
      const { avgStar, totalReviewCount } = bookData;

      // 함수형 업데이트로 bookInfoDatas 업데이트
      setLatestDatas((prevBookInfoDatas) => {
        if (prevBookInfoDatas == null) {
          return route.params.data.book;
        }

        // prevBookInfoDatas에서 updateIsbnData와 일치하는 항목만 avgStar와 totalReviewCount 업데이트
        return prevBookInfoDatas.map((book) => {
          if (book.isbn13 === updateIsbnData) {
            return {
              ...book,
              avgStar: avgStar,
              totalReviewCount: totalReviewCount,
            };
          }
          return book; // 나머지 항목은 그대로 유지
        });
      });
    }
  }, [route.params]);

  const loadMoreData = async () => {
    // 추가적인 10개의 아이템을 생성하여 기존 데이터에 추가합니다.

    const { statusData, ...responseData } = await requestMainLatestReviewsGet(
      user.header,
      currentPage + 1
    );

    if (statusData === 200) {
      setLatestDatas([...latestDatas, ...responseData.data.book]);
      setCurrentPage(currentPage + 1);
    } else if (statusData === 400) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (currentPage < bookEndPage) {
      // 스크롤이 화면 하단에 도달하면 추가 데이터를 로드합니다.
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - 50
      ) {
        loadMoreData();
      }
    }

    setPrevScrollY(contentOffset.y);
  };

  const handleIsbnData = async (isbn) => {
    setUpdateIsbnData(isbn);
  };

  if (latestDatas === null) {
    return <View></View>;
  }

  if (latestDatas.length < 1) {
    return <DetailFail />;
  }

  return (
    <SafeAreaWrapper>
      <ScrollView
        onScroll={handleScroll}
        style={styles.reviewScreenCon}
        contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
      >
        <LatestReviewDetailSuccess
          handleScroll={handleScroll}
          latestDatas={latestDatas}
          handleIsbnData={handleIsbnData}
          goToPrev={goToPrev}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({});

export default LatestReviewDetailScreen;
