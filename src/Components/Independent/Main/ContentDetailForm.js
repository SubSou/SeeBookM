import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  DARKGRAY,
  LIGHTGRAY,
  MEDIUMGRAY,
  NEARWHITE,
  SELECTBLACK,
  SIGNATURECOLOR,
  WHITE,
} from '../../../color';
import { screenHeight, vScale } from '../../../Normalization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContentDetailForm = ({ handelDetailForm, contnet = '' }) => {
  const insets = useSafeAreaInsets(); // 모바일 최상단 바 패딩 크기

  return (
    <View style={styles.contentDetailCon}>
      <View
        style={[
          styles.contentWhiteWrap,
          {
            height: screenHeight,
            paddingTop: insets.top + 141,
            paddingBottom: 141,
          },
        ]}
      >
        <View style={styles.contentWhiteItem}>
          <View style={styles.whiteItemTop}>
            <View>
              <Text style={styles.contentTitleText}>줄거리</Text>
            </View>
            <View style={styles.contentDetailBox}>
              <View style={styles.contentDetail}>
                <Text style={styles.contentDetailText}>{contnet}</Text>
              </View>
            </View>
          </View>
          <Pressable onPress={handelDetailForm}>
            <View style={styles.whiteItemBottom}>
              <Text style={styles.btnText}>확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.contentBlackWrap}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentDetailCon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
  contentWhiteWrap: {
    width: '100%',
    paddingHorizontal: 30,
  },
  contentWhiteItem: {
    width: '100%',
    height: '100%',
    backgroundColor: WHITE,
    zIndex: 100,
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
  whiteItemTop: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  contentBlackWrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: SELECTBLACK,
    opacity: 0.64,
  },
  contentTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: SELECTBLACK,
  },
  contentDetailBox: {
    marginTop: 30,
    width: '100%',
    flex: 1,
  },
  contentDetail: {
    backgroundColor: NEARWHITE,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,

    width: '100%',
    height: '100%',
  },
  contentDetailText: {
    color: MEDIUMGRAY,
    fontSize: 14,
  },
  whiteItemBottom: {
    width: '100%',
    height: vScale(50),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SIGNATURECOLOR,
  },
  btnText: {
    color: WHITE,
  },
});

export default ContentDetailForm;
