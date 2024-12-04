import { Pressable, StyleSheet, Text, View } from "react-native";
import UnderLineText from "../../Common/UnderLineText";
import { authModeTypes } from "../../../mode";
import { MEDIUMGRAY } from "../../../color";

const LoginRegisterArea = ({ goToTerms }) => {
  return (
    <View style={styles.registerArea}>
      <Text style={[styles.smallFontSize, styles.textMediumColor]}>
        처음이신가요?
      </Text>
      <Pressable
        onPress={() => {
          goToTerms();
        }}
      >
        <UnderLineText type={authModeTypes.LOGIN} title={"회원가입"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  registerArea: {
    marginTop: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    height: 14,
  },
  smallFontSize: {
    fontSize: 12,
  },
  textMediumColor: {
    color: MEDIUMGRAY,
  },
});

export default LoginRegisterArea;
