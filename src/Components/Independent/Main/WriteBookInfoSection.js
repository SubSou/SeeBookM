import { Image, StyleSheet, Text, View } from 'react-native';
import { scale, vScale } from '../../../Normalization';
import { LIGHTGRAY, MEDIUMGRAY, SELECTBLACK } from '../../../color';
import React from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import { useMainContext } from '../../../contexts/MainContext ';

const WriteBookInfoSection = React.memo(({ bookInfoData }) => {
  return (
    <View style={styles.writeBookInfoCon}>
      <View style={styles.writeBookInfoImgWrap}>
        <Image
          style={styles.writeBookInfoImg}
          source={{
            uri: bookInfoData.imageLink,
          }}
        />
      </View>
      <View style={styles.writeBookInfoTextWrap}>
        <Text style={styles.writeBookInfoNameText}>{bookInfoData.title}</Text>
        <Text style={styles.writeBookInfoPubText}>
          {bookInfoData.publisher}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  writeBookInfoCon: {
    width: '100%',
    marginTop: 22,
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: LIGHTGRAY,
  },
  writeBookInfoImgWrap: {
    width: scale(81),
    height: vScale(100),
  },
  writeBookInfoImg: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  writeBookInfoTextWrap: {
    marginTop: 20,
    alignItems: 'center',
  },
  writeBookInfoNameText: {
    color: SELECTBLACK,
    fontSize: scale(16),
    fontWeight: '700',
    marginBottom: 5,
  },
  writeBookInfoPubText: {
    color: MEDIUMGRAY,
    fontSize: scale(14),
  },
});

WriteBookInfoSection.displayName = 'WriteBookInfoSection';

export default WriteBookInfoSection;
