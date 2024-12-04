import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vScale } from '../../../Normalization';
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from '../../../color';

const ReportSubmitBtn = ({ isActive, pressFunc }) => {
  return (
    <Pressable onPress={pressFunc}>
      <View
        style={[
          styles.reportSubBtnBox,
          { backgroundColor: isActive ? SIGNATURECOLOR : LIGHTGRAY },
        ]}
      >
        <Text style={{ color: isActive ? WHITE : MEDIUMGRAY }}>수정</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reportSubBtnBox: {
    marginTop: 100,
    width: '100%',
    height: vScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default ReportSubmitBtn;
