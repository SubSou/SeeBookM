import { StyleSheet, View } from 'react-native';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';

import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CategoriDetailSuccess from '../../Components/Independent/Main/CategoriDetailSuccess';

import { useUserContext } from '../../contexts/UserContext';
import { requestMainCategoriGetData } from '../../Api/Main/MainApi';
import { useMainContext } from '../../contexts/MainContext ';
import DetailFail from '../../Components/Common/DetailFail';

const CategoriDetailSceen = () => {
  const route = useRoute();
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();
  const [bookInfoDatas, setBookInfoDatas] = useState(null);
  const [bookEndPage, setBookEndPage] = useState(null);
  const [updateIsbnData, setUpdateIsbnData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cName, setCName] = useState('');
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수

  useEffect(() => {
    if (route.params) {
      if (bookInfoDatas == null) {
        console.log(route.params);
        setBookInfoDatas(route.params.data.book);
        setBookEndPage(route.params.data.endPage);
        setCName(route.params.cName);
      } else {
        const { bookData } = route.params;
        const { avgStar, totalReviewCount } = bookData;

        // 함수형 업데이트로 bookInfoDatas 업데이트
        setBookInfoDatas((prevBookInfoDatas) => {
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
    }
  }, [route.params]);

  const handleIsbnData = async (isbn) => {
    setUpdateIsbnData(isbn);
  };

  const loadMoreData = async () => {
    // 추가적인 10개의 아이템을 생성하여 기존 데이터에 추가합니다.

    const { statusData, ...responseData } = await requestMainCategoriGetData(
      user.header,
      cName,
      currentPage + 1
    );

    if (statusData === 200) {
      setBookInfoDatas([...bookInfoDatas, ...responseData.data.book]);
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

  if (bookInfoDatas === null) {
    return <View></View>;
  }

  return (
    <SafeAreaWrapper>
      {bookInfoDatas.length < 1 ? (
        <DetailFail />
      ) : (
        <CategoriDetailSuccess
          data={bookInfoDatas}
          handleIsbnData={handleIsbnData}
          handleScroll={handleScroll}
        />
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({});

export default CategoriDetailSceen;
