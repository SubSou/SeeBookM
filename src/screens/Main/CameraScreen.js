import { CameraView, useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  DARKGRAY,
  SELECTBLACK,
  SIGNATURECOLOR,
  TERMSAF,
  WHITE,
} from '../../color';
import { vScale } from '../../Normalization';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MainStackRoutes } from '../../navigations/routes';
import { useMainContext } from './../../contexts/MainContext ';
import { requestMainCameraSearchBook } from '../../Api/Main/MainApi';
import { useUserContext } from '../../contexts/UserContext';
import CameraHeaderLeftButton from '../../Components/Independent/Main/CameraHeaderLeftButton';
import SafeAreaWrapper from './../../SafeArea/SafeAreaWrapper ';
import CameraFail from '../../Components/Independent/Main/CameraFail';

const CameraScreen = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { handleTokenExpiry, handleSystemError } = useMainContext();

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  const [isScann, setIsScann] = useState(false);

  const handleBarCodeScanned = async ({ boundingBox, data }) => {
    const { origin, size } = boundingBox;

    if (permission.granted) {
      console.log(!isNoData && !isScann);
      if (!isNoData && !isScann) {
        if (parseInt(size.width) > 120 && data.length === 13) {
          setIsScann(true);
          const { statusData, ...repsonseData } =
            await requestMainCameraSearchBook(user.header, data, 1);

          if (statusData === 200) {
            navigation.navigate(MainStackRoutes.DetailPage, {
              ...repsonseData.data,
            });
          } else if (statusData === 400) {
            setIsNoData(true);
          } else if (statusData === 401) {
            handleTokenExpiry();
          } else {
            handleSystemError();
          }
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 호출할 코드

      setIsNoData(false);
      setIsScann(false);

      return () => {
        // 화면이 블러되었을 때 호출할 코드 (옵션)
        console.log('Screen is unfocused');
      };
    }, [])
  );

  const handleIsNoData = () => {
    setIsNoData(false);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.

    requestPermission();
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const goToBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          facing={facing}
        >
          <CameraHeaderLeftButton pressFunc={goToBack} />
          <View style={styles.buttonContainer}>
            <View style={styles.leftRightOverlay}></View>
            <View style={styles.centerOverlay}>
              <View style={styles.cenrtOverlayTopBoxWrap}>
                <View style={styles.centerOverlayTopBox}>
                  <Text style={styles.topBoxTitleText}>바코드 스캔</Text>
                  <Text style={styles.topBoxSubTitleText}>
                    책에 있는 ISBN 코드를 스캔하세요
                  </Text>
                </View>
                <View style={styles.centerOverlayTopHide}></View>
              </View>
              <View style={styles.centerWrap}>
                <View style={styles.centerBox}>
                  <Image
                    style={styles.topLeftIcon}
                    source={require('../../../assets/topLeftBorder.png')}
                  />
                  <Image
                    style={styles.topRightIcon}
                    source={require('../../../assets/topRightBorder.png')}
                  />
                  <Image
                    style={styles.bottomLeftIcon}
                    source={require('../../../assets/bottomLeftBorder.png')}
                  />
                  <Image
                    style={styles.bottomRightIcon}
                    source={require('../../../assets/bottomRightBorder.png')}
                  />
                </View>

                <View style={styles.centerHideBox}>
                  <View style={styles.hideTopLeft1}></View>
                  <View style={styles.hideTopLeft2}></View>

                  <View style={styles.hideTopRight1}></View>
                  <View style={styles.hideTopRight2}></View>

                  <View style={styles.hideBottomLeft1}></View>
                  <View style={styles.hideBottomLeft2}></View>
                  <View style={styles.hideBottomRight1}></View>
                  <View style={styles.hideBottomRight2}></View>
                </View>
              </View>

              <View style={styles.centerOverlayBox}></View>
            </View>

            <View style={styles.leftRightOverlay}></View>
          </View>
        </CameraView>

        {isNoData ? <CameraFail handleIsNoData={handleIsNoData} /> : <></>}
      </View>
    </SafeAreaWrapper>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  leftRightOverlay: {
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 50,
    height: '100%',
  },
  cenrtOverlayTopBoxWrap: {
    flex: 1,
    width: '100%',

    justifyContent: 'flex-end',
  },
  centerOverlayTopHide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
  },
  centerOverlayTopBox: {
    zIndex: 100,
    marginBottom: 71,
    alignItems: 'center',
  },
  topBoxTitleText: {
    color: WHITE,
    fontSize: 24,
  },
  topBoxSubTitleText: {
    color: TERMSAF,
  },
  centerOverlay: {
    flex: 1,
  },
  centerOverlayBox: {
    flex: 1,
    width: '100%',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
  },

  centerWrap: {
    width: '100%',
    height: vScale(196),
    zIndex: 100,
  },
  centerBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topLeftIcon: {
    position: 'absolute',
    left: -2.5,
    top: -2.5,
    width: 40,
    height: 40,
    zIndex: 100,
  },
  topRightIcon: {
    position: 'absolute',
    right: -2.5,
    top: -2.5,
    width: 40,
    height: 40,
    zIndex: 100,
  },
  bottomLeftIcon: {
    position: 'absolute',
    left: -2.5,
    bottom: -2.5,
    width: 40,
    height: 40,
    zIndex: 100,
  },
  bottomRightIcon: {
    position: 'absolute',
    right: -2.5,
    bottom: -2.5,
    width: 40,
    height: 40,
    zIndex: 100,
  },
  centerHideBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  hideTopLeft1: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    left: -10,
    top: -1,
  },
  hideTopLeft2: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    left: -16,
    top: 7,
  },
  hideTopRight1: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    right: -10,
    top: -1,
  },
  hideTopRight2: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    right: -16,
    top: 7,
  },
  hideBottomLeft1: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    left: -10,
    bottom: -1,
  },
  hideBottomLeft2: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    left: -16,
    bottom: 7,
  },
  hideBottomRight1: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    right: -10,
    bottom: -1,
  },
  hideBottomRight2: {
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
    width: 19,
    height: 8,
    right: -16,
    bottom: 7,
  },
});
