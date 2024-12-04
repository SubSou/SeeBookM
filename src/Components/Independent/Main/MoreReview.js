import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../../Normalization';
import { MEDIUMGRAY, NEARWHITE, SELECTBLACK } from '../../../color';
import ReadRatingBar from './ReadRatingBar';
import { PropTypes } from 'prop-types';
import { useUserContext } from '../../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../../navigations/routes';
import { requestMainDetailItem } from '../../../Api/Main/MainApi';
import { useMainContext } from '../../../contexts/MainContext ';

const MoreReview = ({ data }) => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();
  const { setDetailData } = useUserContext();

  const navigation = useNavigation();

  const goToSearchDetailPage = async (isbn) => {
    const { statusData, ...repsonseData } = await requestMainDetailItem(
      user.header,
      isbn,
      1
    );

    if (statusData === 200) {
      navigation.navigate(MainStackRoutes.DetailPage, {
        ...repsonseData.data,
        route: 'Home',
      });
    } else if (statusData === 401) {
      handleTokenExpiry();
    } else {
      handleSystemError();
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      {data.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            goToSearchDetailPage(item.isbn13);
          }}
        >
          <View style={styles.moreReviewWrap}>
            <View style={styles.moreReviewItem}>
              <Image
                source={{ uri: item.imageLink }}
                style={styles.moreReviewImg}
              />
              <View style={styles.moreReviewContent}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.contentBookName}
                >
                  {item.title}
                </Text>
                <Text style={styles.contentBookPublisher}>
                  {item.publisher}
                </Text>
                <ReadRatingBar
                  ratingScore={item.avgStar}
                  ratingCount={item.totalReviewCount.toString()}
                />
                <View style={styles.contentUserBox}>
                  <Text style={styles.contentUserName}>{item.nickname}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.contentUserComment}
                  >
                    {item.content}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

MoreReview.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  moreReviewWrap: {
    width: '100%',
    height: vScale(100),

    marginBottom: 30,
    paddingHorizontal: 30,
  },
  moreReviewItem: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  moreReviewImg: {
    width: scale(80),
    height: '100%',
    borderRadius: 10,
    marginRight: 15,
  },
  moreReviewContent: {
    flex: 1,
  },
  contentBookName: {
    fontSize: scale(14),
    fontWeight: '700',
    color: SELECTBLACK,
    marginRight: 5,
  },
  contentBookPublisher: {
    fontSize: scale(12),
    color: '#505050',
  },
  contentUserBox: {
    marginTop: 10,
    backgroundColor: NEARWHITE,
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  contentUserName: {
    fontSize: scale(10),
    color: SELECTBLACK,
    fontWeight: '700',
  },
  contentUserComment: {
    fontSize: scale(10),
    color: MEDIUMGRAY,
  },
});

export default MoreReview;
