import { Pressable, StyleSheet, Text, View } from "react-native";

import { LIGHTGRAY, MEDIUMGRAY, SIGNATURECOLOR, WHITE } from "../../../color";

const SignButton = ({ isOk, handleSubmit }) => {
  return (
    <Pressable style={style.signBtnCon} onPress={handleSubmit}>
      <View
        style={[
          style.signBtnWrap,
          { backgroundColor: isOk ? SIGNATURECOLOR : LIGHTGRAY },
        ]}
      >
        <Text style={{ color: isOk ? WHITE : MEDIUMGRAY }}>다음</Text>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  signBtnCon: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    height: 50,
    paddingHorizontal: 30,
  },
  signBtnWrap: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignButton;
