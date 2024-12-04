import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../../Normalization';
import {
  DARKGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  SELECTBLACK,
  TERMSAF,
} from '../../../color';
import ReadRatingBar from './ReadRatingBar';

const MyReviewItem = ({ review, index, handelOpenActionSheet }) => {
  return (
    <View
      style={[styles.myReviewItemWrap, { marginTop: index === 0 ? 30 : 15 }]}
    >
      <View style={styles.myReviewItemBox}>
        <View style={styles.leftColumnItem}>
          <Image style={styles.imgItem} source={{ uri: review.imageLink }} />
        </View>
        <View style={styles.rightColumnItem}>
          <View style={styles.titleItem}>
            <View style={styles.titleMainItem}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.titleItemText}
              >
                {review.title}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                handelOpenActionSheet(review.reviewId);
              }}
            >
              <View>
                <Text style={styles.titleSubItemText}>수정/삭제</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.ratingItem}>
            <ReadRatingBar
              ratingScore={review.starRating}
              ratingCount={review.totalReviewCount}
              size={12}
              marginTop={4}
            />
          </View>
          <View style={styles.contentItem}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.contentItemText}
            >
              {review.content}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myReviewItemWrap: {
    width: '100%',
    height: vScale(110),
    backgroundColor: NEARWHITE,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  myReviewItemBox: {
    flexDirection: 'row',
  },
  leftColumnItem: {
    width: scale(60),
    height: '100%',
  },
  imgItem: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  rightColumnItem: {
    marginLeft: 10,
    flex: 1,

    justifyContent: 'center',
  },
  titleItem: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleMainItem: {
    flex: 1,
  },
  titleItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: SELECTBLACK,
  },
  titleSubItemText: {
    fontSize: 10,
    color: MEDIUMGRAY,
  },
  ratingItem: {
    width: '100%',
  },
  contentItem: {
    marginTop: 10,
  },
  contentItemText: {
    fontSize: 12,
    color: DARKGRAY,
  },
});

export default MyReviewItem;
