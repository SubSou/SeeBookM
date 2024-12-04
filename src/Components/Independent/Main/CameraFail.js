import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vScale } from '../../../Normalization';
import { DARKGRAY, SIGNATURECOLOR, WHITE } from '../../../color';

const CameraFail = ({ handleIsNoData }) => {
  return (
    <View style={styles.searchFailWrap}>
      <View style={styles.searchFailBox}>
        <Text style={styles.searchFailTitleText}>검색된 책이 없어요</Text>
        <Pressable style={styles.searchFailBtn} onPress={handleIsNoData}>
          <Text style={styles.searchFilBtnText}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchFailWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  searchFailBox: {
    width: '100%',
    height: vScale(180),
    borderRadius: 10,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  searchFailTitleText: {
    fontSize: 14,
    color: DARKGRAY,
    fontWeight: '500',
  },
  searchFailBtn: {
    width: '100%',
    height: vScale(50),
    backgroundColor: SIGNATURECOLOR,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFilBtnText: {
    color: WHITE,
    fontSize: 14,
  },
});

export default CameraFail;
