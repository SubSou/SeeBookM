import { Dimensions, PixelRatio } from 'react-native';

// 현재 기기의 화면 크기 가져오기
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 기준이 되는 화면 크기
const BASE_WIDTH = 360;
const BASE_HEIGHT = 740;

// 화면 크기에 따른 비율 계산
const horizontalScale = screenWidth / BASE_WIDTH;
const verticalScale = screenHeight / BASE_HEIGHT;

// 픽셀 값을 수평 스케일링하는 함수
const scale = (size) => PixelRatio.roundToNearestPixel(size * horizontalScale);

// 픽셀 값을 수직 스케일링하는 함수
const vScale = (size) => PixelRatio.roundToNearestPixel(size * verticalScale);

// 중간 정도 스케일링하는 함수 (수평 스케일과 수직 스케일의 중간값)
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const calculatePercentage = (value) => {
  const total = 360;

  if (value === 0) {
    return 0;
  }

  const percentData = Math.round((value / total) * 100) / 100;
  const valueData = screenWidth * percentData;

  return Math.round(valueData);
};

export {
  scale,
  vScale,
  moderateScale,
  calculatePercentage,
  screenWidth,
  screenHeight,
};
