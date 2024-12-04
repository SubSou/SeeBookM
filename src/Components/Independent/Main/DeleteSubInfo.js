import { StyleSheet, Text, View } from 'react-native';
import { SELECTBLACK } from '../../../color';

const DeleteSubInfo = ({ msg = '본인인증을 위해 비밀번호를 입력해주세요' }) => {
  return (
    <View style={styles.deleteSubInfoBox}>
      <Text style={styles.deleteSubInfoText}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteSubInfoBox: {
    marginTop: 60,
  },
  deleteSubInfoText: {
    color: SELECTBLACK,
    fontWeight: '600',
    fontSize: 15,
  },
});

export default DeleteSubInfo;
