import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useUserContext } from '../../../contexts/UserContext';
import ReadRatingBar from './ReadRatingBar';
import {
  LIGHTGRAY,
  MEDIUMGRAY,
  REDCOLOR,
  SELECTBLACK,
  SkyBlue,
} from '../../../color';
import { scale, vScale } from '../../../Normalization';
import { AntDesign } from '@expo/vector-icons';
import {
  requestMainWishListAdd,
  requestMainWishListDelete,
} from '../../../Api/Main/MainApi';
import { useMainContext } from '../../../contexts/MainContext ';
import React, { useEffect, useState } from 'react';

const SearchDetailBookItem = ({
  detailData,
  handleWishList,
  handelDetailForm,
}) => {
  const { user } = useUserContext();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  useEffect(() => {}, [detailData]);

  if (!detailData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    ); // 로딩 상태를 반환하거나 적절한 처리를 합니다.
  }

  const handleWishListClick = async (bookId) => {
    if (detailData.wished) {
      // 찜을 했을 경우
      const statusData = await requestMainWishListDelete(user.header, bookId);
      if (statusData === 200) {
        const wishListCount = detailData.book.wishlistCount;
        handleWishList(false, wishListCount - 1);
      } else if (statusData === 400) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    } else {
      // 찜을 안 할 경우
      const statusData = await requestMainWishListAdd(user.header, bookId);
      if (statusData === 200) {
        const wishListCount = detailData.book.wishlistCount;
        handleWishList(true, wishListCount + 1);
      } else if (statusData === 400) {
        handleTokenExpiry();
      } else {
        handleSystemError();
      }
    }
  };

  const handleHyperBuyLink = async () => {
    const supported = await Linking.canOpenURL(detailData.book.buyLink);

    if (supported) {
      await Linking.openURL(detailData.book.buyLink);
    } else {
      console.log(
        `Don't know how to open this URL: ${detailData.book.buyLink}`
      );
    }
  };

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailBookContent}>
        <Image
          style={styles.detailBookImg}
          source={{ uri: detailData.book.imageLink }}
        />
        <View style={styles.detailBookPublisherBox}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                color: SELECTBLACK,
                fontSize: scale(16),
                fontWeight: '700',
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {detailData.book.title}
            </Text>
          </View>
          <Text
            style={{ marginTop: 5, color: MEDIUMGRAY, fontSize: scale(12) }}
          >
            {detailData.book.publisher}
          </Text>
          <ReadRatingBar
            ratingScore={detailData.book.avgStar}
            ratingCount={detailData.reviewCount.toString()}
          />
          <Pressable
            style={styles.detailBookDesription}
            onPress={() => {
              const chData =
                detailData.book.description === ''
                  ? '줄거리가 없습니다.'
                  : detailData.book.description;

              handelDetailForm(chData);
            }}
          >
            <View>
              <Text
                style={{ fontSize: scale(12), color: MEDIUMGRAY }}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                {detailData.book.description === ''
                  ? '줄거리가 없습니다.'
                  : detailData.book.description}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.detailSubBox}>
        <View style={styles.detailSubLeft}>
          <Pressable
            onPress={() => {
              handleWishListClick(parseInt(detailData.book.bookId));
            }}
          >
            <View>
              {detailData.wished ? (
                <AntDesign name="heart" size={24} color={REDCOLOR} />
              ) : (
                <AntDesign name="hearto" size={24} color={REDCOLOR} />
              )}
            </View>
          </Pressable>
          <Text style={styles.detailSubHeartText}>
            {detailData.book.wishlistCount}
          </Text>
        </View>
        <Pressable onPress={handleHyperBuyLink}>
          <View style={styles.detailSubRight}>
            <Text style={styles.detailSubBuyText}>구매 링크</Text>
            <AntDesign name="right" size={scale(10)} color={SkyBlue} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

SearchDetailBookItem.displayName = 'SearchDetailBookItem'; // react.memo를 사용할 떄 밑에 추가

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: LIGHTGRAY,
  },

  detailBookContent: {
    width: '100%',
    height: vScale(160),
    flexDirection: 'row',
  },
  detailBookImg: {
    width: scale(130),
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },

  detailBookDesription: {
    overflow: 'hidden',
    width: scale(141),
    marginTop: 10,
  },

  detailBookPublisherBox: {
    marginLeft: 20,
    flex: 1,
  },
  detailSubBox: {
    marginTop: vScale(12.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailSubLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailSubHeartText: {
    marginLeft: 5,
    fontSize: scale(14),
    color: REDCOLOR,
  },
  detailSubBuyText: {
    fontSize: scale(12),
    color: SkyBlue,
  },
  detailSubRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchDetailBookItem;
