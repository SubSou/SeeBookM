import { StyleSheet, Text, View } from 'react-native';
import { DARKGRAY, NEARWHITE, TERMSAF } from '../../../color';

const ReportUserNames = ({ myNickName, reportMyNickName }) => {
  return (
    <View style={styles.reportNamesWrap}>
      <View style={styles.reportMyNickNameBox}>
        <View style={styles.reportKindName}>
          <Text style={styles.reportKindNameText}>신고자</Text>
        </View>
        <View style={styles.reportName}>
          <Text style={styles.reportNameText}>{myNickName}</Text>
        </View>
      </View>
      <View style={styles.reportNickNameBox}>
        <View style={styles.reportKindName}>
          <Text style={styles.reportKindNameText}>피신고자</Text>
        </View>
        <View style={styles.reportName}>
          <Text style={styles.reportNameText}>{reportMyNickName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reportNamesWrap: {
    width: '100%',
  },
  reportMyNickNameBox: {
    height: 46,
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  reportNickNameBox: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  reportKindName: {
    width: 63,
  },
  reportKindNameText: {
    color: DARKGRAY,
  },
  reportName: {
    height: '100%',
    backgroundColor: NEARWHITE,

    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 19,
    borderRadius: 10,
  },
  reportNameText: {
    color: TERMSAF,
    fontSize: 16,
  },
});

export default ReportUserNames;
