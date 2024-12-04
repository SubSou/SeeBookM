import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MEDIUMGRAY } from '../../../color';

const DeleteFindPassword = ({ pressFunc }) => {
  return (
    <View style={styles.deleteFindWrap}>
      <Pressable onPress={pressFunc}>
        <View style={styles.deleteFindBox}>
          <Text style={styles.deleteFindText}>비밀번호 찾기</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteFindWrap: {
    marginTop: 20,
    width: '100%',

    alignItems: 'center',
  },
  deleteFindBox: {},
  deleteFindText: {
    textDecorationLine: 'underline',
    fontSize: 11,
    textDecorationColor: MEDIUMGRAY,
    color: MEDIUMGRAY,
  },
});

export default DeleteFindPassword;
