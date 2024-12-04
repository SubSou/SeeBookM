import { StyleSheet, TextInput, View } from 'react-native';
import { LIGHTGRAY, MEDIUMGRAY } from '../../../color';

const DeleteInput = ({ ...props }) => {
  return (
    <View style={styles.deleteInputBox}>
      <TextInput
        {...props}
        secureTextEntry
        placeholderTextColor={MEDIUMGRAY}
        placeholder="비밀번호 입력"
        textAlign="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteInputBox: {
    marginTop: 35,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: LIGHTGRAY,
  },
});

export default DeleteInput;
