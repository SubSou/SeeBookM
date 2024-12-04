import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { scale } from '../../../Normalization';
import { SELECTBLACK, WHITE } from '../../../color';

const { width: screenWidth } = Dimensions.get('window');

const ImageList = () => {
  const initialImages = [
    require('../../../../assets/home-clock.png'),
    require('../../../../assets/home-map.png'),
    require('../../../../assets/splash.png'),
    require('../../../../assets/kakao_login.png'),
  ];

  const leftImages = [...initialImages];
  const imageBoxWidth = scale(screenWidth);
  const [images, setImages] = useState([
    ...leftImages,
    ...initialImages,
    ...initialImages,
  ]);
  const [currentIndex, setCurrentIndex] = useState(imageBoxWidth);
  const [currentOffset, setCurrentOffset] = useState(
    imageBoxWidth * initialImages.length
  );
  const [currentAutoScrollIndex, setCurrentAutoScrollIndex] = useState(
    leftImages.length
  ); // 추가된 부분

  const scrollViewRef = useRef(null);
  const autoScrollTimeout = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [testCuutent, setTestCurrent] = useState(1);
  const [scrollEnabled, setScrollEnabled] = useState(true); // 스크롤 가능 여부

  const imageBoxHeight = scale(178);

  const startAutoScroll = () => {
    stopAutoScroll();

    autoScrollTimeout.current = setTimeout(() => {
      let newOffset = currentOffset;
      let newIndex = currentAutoScrollIndex;

      if (currentAutoScrollIndex === 7) {
        newOffset += imageBoxWidth;
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
        setTimeout(() => {
          // 초기 위치로 이동
          const initialIndex = leftImages.length;
          newOffset = imageBoxWidth * initialIndex;
          scrollViewRef.current.scrollTo({ x: newOffset, animated: false });
          newIndex = initialIndex;
          setCurrentAutoScrollIndex(newIndex);
        }, 500);
      } else {
        // 일반적인 슬라이드 이동
        newOffset += imageBoxWidth;
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
        newIndex += 1;
        setCurrentAutoScrollIndex(newIndex);
      }
    }, 2000); // 2초마다 실행
  };

  const stopAutoScroll = () => {
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = null;
    }
  };
  useEffect(() => {
    const initialIndex = leftImages.length;
    scrollViewRef.current.scrollTo({
      x: imageBoxWidth * initialIndex,
      animated: false,
    });
    startAutoScroll();

    return () => stopAutoScroll();
  }, [imageBoxWidth, leftImages.length]);

  useEffect(() => {
    if (!isScrolling) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [currentOffset, isScrolling]);

  const handleScroll = (event) => {
    stopAutoScroll();

    const offsetX = event.nativeEvent.contentOffset.x;
    setCurrentOffset(offsetX);
    const position = Math.round(offsetX / imageBoxWidth);

    const adjustedIndex = (position - leftImages.length) % initialImages.length;
    setCurrentIndex(
      adjustedIndex < 0 ? initialImages.length - 1 : adjustedIndex
    );
  };

  const handleDotPress = (index) => {
    stopAutoScroll();

    const dotIndex = index;

    const xOffset = imageBoxWidth * (dotIndex + leftImages.length);

    scrollViewRef.current.scrollTo({
      x: xOffset,
      animated: true,
    });

    setCurrentAutoScrollIndex(dotIndex + leftImages.length);
    startAutoScroll();
  };

  const handleScrollEnd = (event) => {
    setScrollEnabled(false);

    setTimeout(() => {
      setScrollEnabled(true);
    }, 300);

    const offsetX = event.nativeEvent.contentOffset.x;
    const position = Math.round(offsetX / imageBoxWidth);

    if (position >= images.length - leftImages.length) {
      scrollViewRef.current.scrollTo({
        x: imageBoxWidth * (position - initialImages.length),
        animated: false,
      });
      setCurrentAutoScrollIndex(position - initialImages.length);
    } else if (position < leftImages.length) {
      scrollViewRef.current.scrollTo({
        x: imageBoxWidth * (position + initialImages.length),
        animated: false,
      });
      setCurrentAutoScrollIndex(position + initialImages.length);
    }
  };

  return (
    <View
      style={{
        marginTop: 30,
        height: imageBoxHeight,
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        // onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        pagingEnabled
        snapToInterval={imageBoxWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        scrollEnabled={scrollEnabled} // 스크롤 제어
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              width: imageBoxWidth,
              height: imageBoxHeight,
              paddingLeft: 0,
            }}
          >
            <Image source={image} style={styles.headerImg} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotContainer}>
        {initialImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null,
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImg: {
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WHITE,
    margin: 5,
  },
  activeDot: {
    backgroundColor: SELECTBLACK,
  },
});

export default ImageList;
