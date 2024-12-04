import { StyleSheet, TextInput, View } from 'react-native';
import { DARKGRAY, LIGHTGRAY, MEDIUMGRAY, NEARWHITE } from '../../../color';
import { vScale } from '../../../Normalization';

const ReportContent = ({ text, setText }) => {
  return (
    <View style={styles.reportContentBox}>
      <TextInput
        placeholder="신고할 내용을 입력해 주세요."
        style={styles.reportContent}
        value={text}
        onChangeText={(value) => setText(value)}
        multiline={true}
        blurOnSubmit={true}
        underlineColorAndroid="transparent"
        returnKeyType="done"
        maxLength={50}
        placeholderTextColor={MEDIUMGRAY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reportContentBox: {
    marginTop: 10,
    height: vScale(200),
  },
  reportContent: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    textAlignVertical: 'top',
    color: MEDIUMGRAY,
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    width: '100%',
    height: '100%',
  },
});

export default ReportContent;
