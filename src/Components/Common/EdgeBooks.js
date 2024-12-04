import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../Normalization';

import { PropTypes } from 'prop-types';
import { useUserContext } from '../../contexts/UserContext';
import { DARKGRAY, SELECTBLACK } from '../../color';
import ReadRatingBar from '../Independent/Main/ReadRatingBar';
import { useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';
import LikeNoItem from '../Independent/Main/LikeNoItem';
import { requestMainDetailItem } from '../../Api/Main/MainApi';
import { useState } from 'react';

const EdgeBooks = ({ data, handleIsbnData }) => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const [isClick, setIsClick] = useState(false);

  const goToSearchDetailPage = async (isbn) => {
    if (!isClick) {
      setIsClick(true);
      const { statusData, ...repsonseData } = await requestMainDetailItem(
        user.header,
        isbn,
        1
      );

      if (statusData === 200) {
        handleIsbnData(isbn);
        navigation.navigate(MainStackRoutes.DetailPage, {
          ...repsonseData.data,
        });
      } else if (statusData === 401) {
        Alert.alert('안내사항', '시스템이 오류가 발생');
      }

      setTimeout(() => {
        setIsClick(false);
      }, 2000);
    }
  };

  if (data.length < 1) {
    return <LikeNoItem />;
  }

  return (
    <View style={styles.edgeMainCon}>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.edgeMainWrap,
            {
              paddingRight: (index + 2) % 2 === 0 ? 20 : 0,
              paddingLeft: (index + 2) % 2 === 0 ? 0 : 20,
              marginTop: index === 0 || index === 1 ? 0 : 30,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              goToSearchDetailPage(item.isbn13, item);
            }}
          >
            <View style={styles.edgeMainItemBox}>
              <Image style={styles.mainImg} source={{ uri: item.imageLink }} />
              <View style={styles.mainContent}>
                <Text
                  style={styles.contentBookName}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <Text style={styles.contentBookPublisher}>
                  {item.publisher}
                </Text>
                <ReadRatingBar
                  ratingScore={item.avgStar}
                  ratingCount={item.totalReviewCount.toString()}
                  size={12}
                  marginTop={0}
                />
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

EdgeBooks.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  edgeMainCon: {
    marginTop: 28,
    paddingHorizontal: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  edgeMainWrap: {
    width: '50%',
    height: vScale(209),
  },
  edgeMainItemBox: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  mainImg: {
    width: '100%',
    height: vScale(157),
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  mainContent: {
    flex: 1,
    marginTop: 5,
    width: '100%',
    justifyContent: 'center',
  },
  contentBookName: {
    fontSize: scale(14),
    fontWeight: '700',
    color: SELECTBLACK,
  },
  contentBookPublisher: {
    fontSize: scale(12),
    color: DARKGRAY,
  },
});

export default EdgeBooks;
