import { Image, StyleSheet, View } from 'react-native';
import { LIGHTGRAY } from '../../../color';
import { screenWidth, vScale } from '../../../Normalization';

const LatesReview = ({ reviewDatas }) => {
  const reviewHeaderItemWidth = (screenWidth - 60 - 40) / 3;
  const reviewHeaderItemHeight = vScale(120);

  return (
    <View style={styles.latestReviewItemWrap}>
      {reviewDatas.map((item, index) => (
        <View
          key={index}
          style={[
            styles.latestReviewItem,
            {
              width: reviewHeaderItemWidth,
              height: reviewHeaderItemHeight,
              marginRight: index != 2 ? 20 : 0,
            },
          ]}
        >
          <Image
            style={styles.latestReviewImage}
            source={{ uri: item.imageLink }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  latestReviewItemWrap: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
  },
  latestReviewItem: {
    backgroundColor: LIGHTGRAY,
    borderRadius: 10,
  },
  latestReviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default LatesReview;
