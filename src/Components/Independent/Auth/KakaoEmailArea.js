import { StyleSheet, Text, View } from 'react-native';
import { LIGHTGRAY, TERMSAF } from '../../../color';

const KakaoEmailArea = ({ email }) => {
  return (
    <View style={styles.kakaoEmailCon}>
      <Text style={styles.kakoEmailText}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  kakaoEmailCon: {
    marginTop: 40,
    backgroundColor: LIGHTGRAY,
    paddingVertical: 11,
    paddingLeft: 10,
    borderRadius: 5,
  },
  kakoEmailText: {
    color: TERMSAF,
  },
});

export default KakaoEmailArea;
