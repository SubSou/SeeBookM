import { Pressable, StyleSheet, Text, View } from "react-native";
import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from "../../../color";

const PasswordChangeBtn = ({ toggleBtn, handleChangePassword }) => {
  return (
    <Pressable onPress={handleChangePassword}>
      <View
        style={[
          styles.chBtn,
          { backgroundColor: toggleBtn ? SIGNATURECOLOR : LIGHTGRAY },
        ]}
      >
        <Text style={{ color: toggleBtn ? WHITE : MEDIUMGRAY }}>
          비밀번호 변경하기
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    marginTop: 250,
  },
});

export default PasswordChangeBtn;
