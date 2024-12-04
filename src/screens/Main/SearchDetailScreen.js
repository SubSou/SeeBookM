import { Alert, BackHandler, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderLeftButton from '../../Components/Common/HeaderLeftButton';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import SearchDetailBookItem from '../../Components/Independent/Main/SearchDetailBookItem';
import SearchDetailDropDown from '../../Components/Independent/Main/SearchDetailDropDown';
import { REDCOLOR, WHITE } from '../../color';
import SearchDetailCommentItem from '../../Components/Independent/Main/SearchDetailCommentItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FAB from '../../Components/Common/FAB';
import { vScale } from '../../Normalization';
import { MainStackRoutes, MainTabRoutes } from '../../navigations/routes';
import { useMainContext } from '../../contexts/MainContext ';
import { useUserContext } from '../../contexts/UserContext';
import {
  reqeustMainCommentCheck,
  requestMainCommentDelete,
  requestMainCommentModify,
  requestMainDetailItem,
} from '../../Api/Main/MainApi';
import { useActionSheet } from '@expo/react-native-action-sheet';
import ModifyCommentForm from '../../Components/Common/ModifyCommentForm';
import ContentDetailForm from '../../Components/Independent/Main/ContentDetailForm';

const ActionSheetOptions = {
  options: ['삭제', '수정', '신고', '취소'],
  cancelButtonIndex: 3,
  destructiveButtonIndex: 0,
  destructiveColor: REDCOLOR,
};

const SearchDetailScreen = React.memo(() => {
  const {
    hasAnimated,
    handleScrollEnd,
    stopInfiniteScroll,
    detailData,
    setDetailData,
    handleTokenExpiry,
    handleSystemError,
    dispatch,
  } = useMainContext();

  const prevRoutePages = [
    'mainTab',
    'search',
    'CategoriDetail',
    'LatestReviewDetail',
  ];

  const { user } = useUserContext();

  const { showActionSheetWithOptions } = useActionSheet();

  const previousRouteName = useNavigationState((state) => {
    const previousRoute = state.routes[state.index - 1];
    return previousRoute ? previousRoute.name : null;
  });

  const dropDownSubData = [
    { label: '최신순', value: 'latest' },
    { label: '오래된순', value: 'oldest' },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const [selectDropData, setDropData] = useState(dropDownSubData[0]);

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 변수 추가

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const route = useRoute();
  const responseData = route.params;

  const [bookInfoData, setBookInfoData] = useState(responseData);

  const [commentData, setCommentData] = useState(responseData.review);

  useEffect(() => {
    if (detailData !== null) {
      setBookInfoData(detailData);
      setCommentData(detailData.review);
      setCurrentPage(1);
    }
  }, [detailData]);

  useEffect(() => {
    // 클린업 함수
    return () => {
      setDetailData(null); // 컴포넌트가 언 마운트 되면 회원가입할 때 정보들을 초기화 해주는 함수
    };
  }, []); // 빈 배열을 두 번째 인자로 전달하면, 이펙트는 한 번만 실행되고 언마운트 시 클린업 함수가 호출됨

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 호출할 코드
      stopInfiniteScroll(0);

      hasAnimated.current = false;
      return () => {
        // 화면이 블러되었을 때 호출할 코드 (옵션)
        console.log('Screen is unfocused');
      };
    }, [])
  );

  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수

  const [scrollMode, setScrollMode] = useState(true); // 현재 scrollMode가 무엇인지 저장하는 변수
  const [isModify, setIsModify] = useState(false);
  const [isContentDetail, setIsContentDetail] = useState(false);
  const [modifyReviewId, setModifyReviewId] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치 저장 상태
  const [detailContent, setDetailContent] = useState('');
  const scrollViewRef = useRef(null); // ScrollView 참조를 위한 ref

  const handleUpdateData = async () => {
    let updataData = [];
    for (let i = 1; i <= currentPage; i++) {
      const { statusData, ...reloadData } = await requestMainDetailItem(
        user.header,
        bookInfoData.book.isbn13,
        i
      );

      if (selectDropData.value === 'latest') {
        updataData = [...updataData, ...reloadData.data.review];
      } else {
        updataData = [...reloadData.data.review, ...updataData];
      }

      if (i === currentPage) {
        const updatedBookInfo = {
          ...reloadData.data, // 기존 데이터 유지
          reviewCount: reloadData.data.reviewCount,
        };
        setBookInfoData(updatedBookInfo);
      }
    }
    setCommentData(updataData);
  };

  const handleCommentDelete = async (reviewId) => {
    const deleteStatusData = await requestMainCommentDelete(
      user.header,
      reviewId
    );

    if (deleteStatusData === 200) {
      handleUpdateData();
    } else if (deleteStatusData === 400) {
      handleSystemError();
    } else if (deleteStatusData === 404) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleCommentModify = async (avgStar, content) => {
    const checkStatusData = await handleCommentCheck(modifyReviewId);
    if (checkStatusData === 200) {
      const modifyStatusData = await requestMainCommentModify(
        user.header,
        modifyReviewId,
        avgStar,
        content
      );

      if (modifyStatusData === 200) {
        handleUpdateData();
        setIsModify(false);
      } else if (modifyStatusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } else if (checkStatusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const onPressActionSheet = async (idx, reviewId) => {
    if (idx === 0) {
      const checkStatusData = await handleCommentCheck(reviewId);

      if (checkStatusData === 200) {
        handleCommentDelete(reviewId);
      } else if (checkStatusData === 400) {
        Alert.alert('안내사항', '자신이 작성한 댓글이 아닙니다.');
      } else if (checkStatusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } else if (idx === 1) {
      setIsModify(true);
      setModifyReviewId(reviewId);
    } else if (idx === 2) {
      const filteredReviews = commentData.map(
        ({ nickname, reviewId, userId }) => ({
          nickname,
          reviewId,
          userId,
        })
      )[0];

      navigation.navigate(MainStackRoutes.ReportPage, filteredReviews);
    }
  };

  const handleCommentCheck = async (reviewId) => {
    const statusData = await reqeustMainCommentCheck(user.header, reviewId);

    return statusData;
  };

  const handelOpenActionSheet = (reviewId) => {
    showActionSheetWithOptions(ActionSheetOptions, (index) =>
      onPressActionSheet(index, reviewId)
    );
  };

  const handleCloseModifyForm = () => {
    setIsModify(false);
  };

  const goToPrevScreen = useCallback(() => {
    const matchedPage = prevRoutePages.find(
      (page) => page === previousRouteName
    );

    if (route.params.route == 'Home') {
      navigation.navigate(MainStackRoutes.MainTab, {
        screen: MainTabRoutes.HomePage, // 'TabNavigator' 네비게이터 안의 HomeScreen으로 이동
        params: {
          bookData: bookInfoData.book, // 중첩된 네비게이터의 특정 화면
          reviewCount: bookInfoData.reviewCount,
        },
      });
    } else if (MainStackRoutes.MainTab === matchedPage) {
      navigation.navigate(MainStackRoutes.MainTab, {
        screen: MainTabRoutes.LikePage, // 'TabNavigator' 네비게이터 안의 LikeScreen으로 이동
        params: {
          bookData: bookInfoData.book, // 중첩된 네비게이터의 특정 화면
          wishedData: bookInfoData.wished,
          reviewCount: bookInfoData.reviewCount,
        },
      });
    } else if (MainStackRoutes.SearchPage === matchedPage) {
      navigation.navigate(MainStackRoutes.SearchPage, {
        avgStar: bookInfoData.book.avgStar,
        reviewCount: bookInfoData.reviewCount,
        isbn13: bookInfoData.book.isbn13,
      });
    } else if (MainStackRoutes.CategoriDetailPage === matchedPage) {
      navigation.navigate(MainStackRoutes.CategoriDetailPage, {
        bookData: bookInfoData.book,
        wishedData: bookInfoData.wished,
        reviewCount: bookInfoData.reviewCount,
      });
    } else if (MainStackRoutes.LatestReviewDetailPage === matchedPage) {
      navigation.navigate(MainStackRoutes.LatestReviewDetailPage, {
        bookData: bookInfoData.book,
        wishedData: bookInfoData.wished,
        reviewCount: bookInfoData.reviewCount,
      });
    } else {
      navigation.goBack();
    }
  }, [navigation, bookInfoData]);

  useEffect(() => {
    hasAnimated.current = false;
  }, [scrollMode, hasAnimated]);

  useEffect(() => {
    const backAction = () => {
      goToPrevScreen();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => backHandler.remove();
  }, [bookInfoData]);

  useEffect(() => {
    if (detailContent !== '') {
      setIsContentDetail(true);
    }
  }, [detailContent]);

  const loadMoreData = async () => {
    if (isLoading || currentPage > bookInfoData.endPage) {
      return;
    } else {
      setIsLoading(true); // 로딩 시작
      const { statusData, ...responseData } = await requestMainDetailItem(
        user.header,
        bookInfoData.book.isbn13,
        currentPage + 1
      );
      if (statusData === 200) {
        setCommentData([...commentData, ...responseData.data.review]); // 이전 데이터와 새로운 데이터 합치기
        setCurrentPage(currentPage + 1);
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        Alert.alert(
          '안내사항',
          '시스템에 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
      setIsLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    setScrollPosition(event.nativeEvent.contentOffset.y); // 스크롤 Y축 위치 저장
    // 스크롤이 화면 하단에 도달하면 추가 데이터를 로드합니다.
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 50) {
      loadMoreData();
    }

    if (contentOffset.y < prevScrollY || contentOffset.y <= 0) {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Up이면 실행 x
      if (!(scrollMode == 'Up')) {
        setScrollMode('Up');
        stopInfiniteScroll(0);
      }
    } else {
      // 만약 최상위 화면으로 강하게 스크롤 했을 때 두번 호출되는것을 방지하기 위해 현재 mode값이 Down이면 실행 x
      if (!(scrollMode == 'Down')) {
        setScrollMode('Down');
        stopInfiniteScroll(50 * 2);
      }
    }

    // 이전 스크롤 위치 업데이트
    setPrevScrollY(contentOffset.y);
  };

  const handleSelectDropData = (data) => {
    setDropData(data);

    // reviewId 기준으로 정렬
    let sortedComments;

    if (data.value === 'latest') {
      // 최신순: reviewId 내림차순 정렬
      sortedComments = [...commentData].sort((a, b) => b.reviewId - a.reviewId);
    } else if (data.value === 'oldest') {
      // 오래된순: reviewId 오름차순 정렬
      sortedComments = [...commentData].sort((a, b) => a.reviewId - b.reviewId);
    }
    setCommentData(sortedComments);
  };

  const goToCommentWritePage = () => {
    navigation.navigate(MainStackRoutes.CommentWritePage, {
      ...bookInfoData.book,
    });
  };

  const handleWishList = (wished, wishlistCount) => {
    const updatedBookInfo = {
      ...bookInfoData.book, // 기존 데이터 유지
      wishlistCount: wishlistCount, // wishListCount 감소
    };

    setBookInfoData({
      book: updatedBookInfo,
      reviewCount: bookInfoData.reviewCount,
      wished: wished,
    });
  };

  const handelDetailForm = (detailContent) => {
    setDetailContent(detailContent);
  };

  const closeDetailForm = () => {
    setIsContentDetail(false);
    setDetailContent('');
  };

  if (!bookInfoData || !commentData) {
    return (
      <View>
        <Text>로딩 중...</Text>
      </View>
    ); // 로딩 상태를 반환하거나 적절한 처리를 합니다.
  }

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <ScrollView
        ref={scrollViewRef} // ScrollView에 ref 설정
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingBottom: 60,
          flexGrow: 1,
          paddingHorizontal: 30,
        }}
        style={{
          paddingTop: insets.top,
        }}
      >
        <HeaderLeftButton pressFunc={goToPrevScreen} type="detail" />
        <SearchDetailBookItem
          detailData={bookInfoData}
          handleWishList={handleWishList}
          handelDetailForm={handelDetailForm}
        />
        <SearchDetailDropDown
          dropDownSubData={dropDownSubData}
          selectDropData={selectDropData}
          handleSelectDropData={handleSelectDropData}
        />
        <SearchDetailCommentItem
          commentData={commentData}
          handelOpenActionSheet={handelOpenActionSheet}
        />
      </ScrollView>

      {isModify ? (
        <ModifyCommentForm
          handleCommentModify={handleCommentModify}
          handleCloseModifyForm={handleCloseModifyForm}
        />
      ) : (
        <></>
      )}
      {isContentDetail ? (
        <ContentDetailForm
          contnet={detailContent}
          handelDetailForm={closeDetailForm}
        />
      ) : (
        <></>
      )}

      <FAB
        FABY={vScale(650)}
        pressFunc={goToCommentWritePage}
        icon={<MaterialCommunityIcons name="pencil" size={24} color={WHITE} />}
      />
    </View>
  );
});

SearchDetailScreen.displayName = 'SearchDetailScreen';

export default SearchDetailScreen;
