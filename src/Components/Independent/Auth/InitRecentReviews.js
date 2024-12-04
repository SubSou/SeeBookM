import React, { useRef, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LIGHTGRAY, NEARWHITE, SELECTBLACK, TERMSAF } from '../../../color';
import NonRecentReviews from './NonRecentReviews';
import { useFocusEffect } from '@react-navigation/native';

const InitRecentReviews = ({ reviewDatas }) => {
  const scrollViewRef = useRef(null); // ScrollView를 참조하기 위한 useRef 생성
  const scrollOffset = useRef(0);
  const itemHeight = 55; // 아이템 하나의 높이
  const isMove = reviewDatas.length >= 1 && reviewDatas.length <= 4;

  // 데이터 무한 반복을 위해 복사본을 생성
  const extendedData = isMove ? reviewDatas : [...reviewDatas, ...reviewDatas]; // 데이터를 2번 반복

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        if (scrollViewRef.current && !isMove) {
          // 스크롤이 20개의 아이템을 넘었을 때 처음으로 리셋

          if (scrollOffset.current >= reviewDatas.length * itemHeight) {
            scrollOffset.current = 0; // 오프셋을 0으로 리셋
            scrollViewRef.current.scrollTo({
              y: scrollOffset.current,
              animated: false, // 순간적으로 처음으로 이동
            });

            scrollOffset.current = itemHeight; // 오프셋을 다음 아이템으로 이동
            scrollViewRef.current.scrollTo({
              y: scrollOffset.current,
              animated: true,
            });
          } else {
            scrollOffset.current += itemHeight; // 스크롤 오프셋을 아이템 높이만큼 증가
            scrollViewRef.current.scrollTo({
              y: scrollOffset.current,
              animated: true,
            });
          }
        }
      }, 1000); // 1초마다 실행

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
    }, [reviewDatas.length, itemHeight, scrollViewRef.current]) // 종속성 배열 추가
  );

  if (reviewDatas.length < 1) {
    return <NonRecentReviews />;
  }

  return (
    <View style={[styles.container]}>
      {/* 상단 그라데이션 */}
      {isMove ? (
        <></>
      ) : (
        <LinearGradient
          colors={['#ffffff', '#ffffff00']}
          style={styles.topGradient}
          pointerEvents="none"
        />
      )}

      {/* ScrollView에 ref를 scrollViewRef로 지정 */}
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          reviewDatas.length >= 1 && reviewDatas.length <= 4
            ? styles.lessReviewLayout
            : styles.moreReviewLayout
        }
      >
        {extendedData.map((item, index) => (
          <View key={index} style={styles.reviewWrap}>
            <View style={styles.reviewBox}>
              <Text style={styles.reviewTitleText}>{item.nickname}</Text>
              <Text style={styles.reviewContentText}>{item.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 그라데이션 */}
      {isMove ? (
        <></>
      ) : (
        <LinearGradient
          colors={['#ffffff00', '#ffffff']}
          style={styles.bottomGradient}
          pointerEvents="none"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 54,
    overflow: 'hidden',
    height: 285,
    width: '100%',
  },
  reviewWrap: {
    height: 55, // 아이템의 고정된 높이
    backgroundColor: NEARWHITE,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessReviewLayout: {
    justifyContent: 'center',
    flex: 1,
  },
  moreReviewLayout: {},
  reviewBox: {
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  reviewTitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: SELECTBLACK,
  },
  reviewContentText: {
    fontSize: 16,
    color: TERMSAF,
  },
});

export default InitRecentReviews;
