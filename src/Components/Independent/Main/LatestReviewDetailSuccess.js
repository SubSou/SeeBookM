import { ScrollView, StyleSheet, View } from 'react-native';
import EdgeBooks from '../../Common/EdgeBooks';
import LeftBtnAndTitleHeader from './../../Common/LeftBtnAndTitleHeader';

const LatestReviewDetailSuccess = ({
  handleScroll,
  latestDatas,
  handleIsbnData,
  goToPrev,
}) => {
  return (
    <View style={styles.reviewScreenCon}>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
      >
        <View style={styles.headerWrap}>
          <LeftBtnAndTitleHeader
            pressFunc={goToPrev}
            title={'최근 리뷰가 작성된 책'}
          />
        </View>
        <View style={styles.mainWrap}>
          <EdgeBooks data={latestDatas} handleIsbnData={handleIsbnData} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 30,
  },
  mainWrap: {
    paddingHorizontal: 5,
  },
});

export default LatestReviewDetailSuccess;
