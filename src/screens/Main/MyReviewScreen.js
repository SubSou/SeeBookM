import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useUserContext } from '../../contexts/UserContext';
import {
  requestMainCommentDelete,
  requestMainCommentModify,
  requestMainMyReviewsGet,
  requestMainProfileGet,
} from '../../Api/Main/MainApi';
import SafeAreaWrapper from '../../SafeArea/SafeAreaWrapper ';
import LeftBtnAndTitleHeader from '../../Components/Common/LeftBtnAndTitleHeader';
import MyReviewItems from '../../Components/Independent/Main/MyReviewItems';
import { useMainContext } from '../../contexts/MainContext ';
import MyReviewSuccess from '../../Components/Independent/Main/MyReviewSuccess';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { REDCOLOR } from '../../color';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';
import ModifyCommentForm from '../../Components/Common/ModifyCommentForm';

const ActionSheetOptions = {
  options: ['삭제', '수정', '취소'],
  cancelButtonIndex: 2,
  destructiveButtonIndex: 0,
  destructiveColor: REDCOLOR,
};
const ActionSheetTable = { DELETE: 'DELETE', UPDATE: 'UPDATE' };

const MyReviewScreen = () => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError, setMainProfileData } =
    useMainContext();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();

  const [myReviewDatas, setMyReviewDatas] = useState(null);
  const [updateIsbnData, setUpdateIsbnData] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0); // 이전 스크롤 위치를 저장할 상태 변수
  const [currentPage, setCurrentPage] = useState(1);
  const [bookEndPage, setBookEndPage] = useState(null);
  const [modifyReviewId, setModifyReviewId] = useState(0);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const { statusData, ...responseData } = await requestMainMyReviewsGet(
          user.header,
          1
        );

        if (statusData === 200) {
          setMyReviewDatas(responseData.data.review);
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

  const goToPrev = () => {
    navigation.goBack();
  };

  const handleUpdateData = async (
    reviewId,
    actionType,
    updatedAvgStar,
    updatedContent
  ) => {
    if (actionType === ActionSheetTable.DELETE) {
      setMyReviewDatas(
        (prevReviewDatas) =>
          prevReviewDatas?.filter((review) => review.reviewId !== reviewId) ||
          []
      );
    } else if (actionType === ActionSheetTable.UPDATE) {
      setMyReviewDatas(
        (prevReviewDatas) =>
          prevReviewDatas?.map((review) =>
            review.reviewId === reviewId
              ? {
                  ...review,

                  starRating: updatedAvgStar,
                  content: updatedContent,
                }
              : review
          ) || []
      );
    }
  };

  const handleCommentDelete = async (reviewId) => {
    const deleteStatusData = await requestMainCommentDelete(
      user.header,
      reviewId
    );

    if (deleteStatusData === 200) {
      handleUpdateData(reviewId, ActionSheetTable.DELETE);
      const { statusData, ...responseData } = await requestMainProfileGet(
        user.header
      );
      if (statusData === 200) {
        setMainProfileData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            level: responseData.data.level,
            levelCount: responseData.data.levelCount,
          },
        }));
      } else if (statusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } else if (deleteStatusData === 401) {
      handleSystemError();
    } else if (deleteStatusData === 404) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  const handleCommentModify = async (avgStar, content) => {
    if (content.length > 0) {
      const modifyStatusData = await requestMainCommentModify(
        user.header,
        modifyReviewId,
        avgStar,
        content
      );

      if (modifyStatusData === 200) {
        handleUpdateData(
          modifyReviewId,
          ActionSheetTable.UPDATE,
          avgStar,
          content
        );
        setIsModify(false);
      } else if (modifyStatusData === 401) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  const onPressActionSheet = async (idx, reviewId) => {
    if (idx === 0) {
      handleCommentDelete(reviewId);
    } else if (idx === 1) {
      setIsModify(true);
      setModifyReviewId(reviewId);
    }
  };

  const handelOpenActionSheet = (reviewId) => {
    showActionSheetWithOptions(ActionSheetOptions, (index) =>
      onPressActionSheet(index, reviewId)
    );
  };

  const handleCloseModifyForm = () => {
    setIsModify(false);
  };

  const loadMoreData = async () => {
    // 추가적인 10개의 아이템을 생성하여 기존 데이터에 추가합니다.

    const { statusData, ...responseData } = await requestMainMyReviewsGet(
      user.header,
      currentPage + 1
    );

    if (statusData === 200) {
      setMyReviewDatas([...myReviewDatas, ...responseData.data.review]);
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

  if (myReviewDatas === null) {
    return <View></View>;
  }

  return (
    <SafeAreaWrapper>
      <View style={{ flex: 1 }}>
        <MyReviewSuccess
          myReviewDatas={myReviewDatas}
          handleScroll={handleScroll}
          handelOpenActionSheet={handelOpenActionSheet}
          goToPrev={goToPrev}
        />
        {isModify ? (
          <ModifyCommentForm
            handleCommentModify={handleCommentModify}
            handleCloseModifyForm={handleCloseModifyForm}
          />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({});

export default MyReviewScreen;
