import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../../Normalization';
import {
  DARKGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  SELECTBLACK,
  WHITE,
} from '../../../color';
import { AntDesign } from '@expo/vector-icons';
import ReadRatingBar from './ReadRatingBar';
import PageBtn from '../../Common/PageBtn';

const TheirReviewItems = ({
  theirReviews,
  pageData,
  setPageData,
  handelNextBtnPage,
  handelPrevBtnPage,
  handlePageBtn,
  prevBtnActive,
  nextBtnActive,
  currentPage,
}) => {
  const formatDate = (dateString) => {
    // 입력 받은 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 년, 월, 일을 추출
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate().toString().padStart(2, '0');

    // '0000.00.00' 형식으로 반환
    return `${year}.${month}.${day}`;
  };

  return (
    <View>
      {theirReviews.map((item, index) => {
        const chDate = formatDate(item.createdDate);

        return (
          <View
            key={index}
            style={[styles.reviewItemCon, { marginTop: index != 0 ? 30 : 20 }]}
          >
            <View style={styles.reviewItemTopWrap}>
              <View style={styles.reviewItemTopBox}>
                <View style={styles.topItemInfo}>
                  <Image src={item.imageLink} style={styles.reviewImg} />
                  <View style={styles.reviewContent}>
                    <Text
                      style={styles.reviewTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <Text>저자 </Text>
                  </View>
                </View>
                <View>
                  <AntDesign name="right" size={15} color="#505050" />
                </View>
              </View>
            </View>
            <View style={styles.reviewItemBottomBox}>
              <View style={styles.reviewItemBottom}>
                <Text style={styles.reviewDate}>{chDate}</Text>
                <ReadRatingBar ratingScore={item.avgBookStarRating} size={10} />
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.reviewContentText}>{item.content}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItemCon: {
    width: '100%',
  },
  reviewItemTopWrap: {
    width: '100%',
    height: vScale(87),
    backgroundColor: WHITE,
    elevation: 2,
    borderRadius: 10,
    zIndex: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },

  reviewItemBottomBox: {
    width: '100%',
    paddingHorizontal: 5,
  },
  reviewItemBottom: {
    width: '100%',
    height: vScale(125),
    backgroundColor: NEARWHITE,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  reviewItemTopBox: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topItemInfo: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
  },

  reviewImg: {
    width: scale(50),
    backgroundColor: 'blue',
    height: '100%',
    borderRadius: 10,
  },
  reviewContent: {
    flex: 1,
    height: '100%',
    marginLeft: 12,
    justifyContent: 'center',
  },
  reviewTitle: {
    fontSize: 14,
    color: SELECTBLACK,
    fontWeight: '700',
  },
  reviewDate: {
    fontSize: 12,
    color: MEDIUMGRAY,
  },
  reviewContentText: {
    fontSize: 12,
    color: DARKGRAY,
  },
});

export default TheirReviewItems;
