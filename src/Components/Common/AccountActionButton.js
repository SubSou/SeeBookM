import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../../contexts/UserContext";
import {
  LIGHTGRAY,
  MEDIUMGRAY,
  SELECTBLACK,
  SIGNATURECOLOR,
  WHITE,
} from "../../color";
import { vScale } from "../../Normalization";
import { useSignUpContext } from "../../contexts/SignUpContext";

const AccountActionButton = ({
  stepAMsg,
  stepBMsg,
  step = "stepA",
  handleFunc,
  toggleBtn,
  toastMsg = "인증번호가 전송되었어요",
  marginTop = 100,
}) => {
  const { fadeAnim } = useSignUpContext();
  console.log(fadeAnim);

  return (
    <View style={[styles.toastMsgWrap, { marginTop: marginTop }]}>
      <Animated.View style={[styles.toastMsgHideBox, { opacity: fadeAnim }]}>
        <View style={styles.toastMsgExternel}>
          <Text style={{ color: WHITE }}>{toastMsg}</Text>
        </View>

        <View style={styles.toastMsgInner}></View>
      </Animated.View>
      <Pressable onPress={handleFunc}>
        <View
          style={[
            styles.stepBtn,
            { backgroundColor: toggleBtn ? SIGNATURECOLOR : LIGHTGRAY },
          ]}
        >
          <Text style={{ color: toggleBtn ? WHITE : MEDIUMGRAY }}>
            {step === "stepA" ? stepAMsg : stepBMsg}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  toastMsgWrap: {
    gap: 33,
  },
  toastMsgHideBox: {
    paddingHorizontal: 15,
    height: 40,
  },
  toastMsgInner: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    backgroundColor: SELECTBLACK,
    opacity: 0.6,
  },
  toastMsgExternel: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    position: "absolute",
    left: 15,
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtn: {
    height: vScale(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default AccountActionButton;
