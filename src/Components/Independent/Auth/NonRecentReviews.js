import { StyleSheet, Text, View } from 'react-native';
import { MEDIUMGRAY } from '../../../color';

const NonRecentReviews = () => {
  return (
    <View style={styles.con}>
      <Text style={styles.nonReviewText}>작성된 리뷰가 없습니다.</Text>
    </View>
  );
};

export default NonRecentReviews;

const styles = StyleSheet.create({
  con: {
    marginTop: 54,
    overflow: 'hidden',
    height: 285,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nonReviewText: {
    color: MEDIUMGRAY,
  },
});
