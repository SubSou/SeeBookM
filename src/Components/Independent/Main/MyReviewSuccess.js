import { ScrollView, StyleSheet, View } from 'react-native';
import MyReviewItems from './MyReviewItems';
import LeftBtnAndTitleHeader from '../../Common/LeftBtnAndTitleHeader';
import ModifyCommentForm from '../../Common/ModifyCommentForm';

const MyReviewSuccess = ({
  myReviewDatas,
  handleScroll,
  handelOpenActionSheet,
  goToPrev,
}) => {
  return (
    <ScrollView
      onScroll={handleScroll}
      contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 30 }}
    >
      <LeftBtnAndTitleHeader title={'리뷰페이지'} pressFunc={goToPrev} />
      <MyReviewItems
        myReviewDatas={myReviewDatas}
        handelOpenActionSheet={handelOpenActionSheet}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  myReviewCon: {
    width: '100%',
    paddingHorizontal: 30,
  },
});

export default MyReviewSuccess;
