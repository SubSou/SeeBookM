import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { useCallback, useEffect, useState } from "react";

import StepTitle from "../../Common/StepTitle";
import EmailInput from "./StepBInputComponet/EmailInput";
import { AntDesign } from "@expo/vector-icons";
import { DARKGRAY, LIGHTBEIGE, MEDIUMGRAY } from "../../../color";
import { Animated } from "react-native";
import { useSignUpContext } from "../../../contexts/SignUpContext";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "../../../navigations/routes";

const EmailVerification = ({ offsetB, setToggleBtn }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  const [validInputEle, setValidInputEle] = useState({
    email: false,
  });

  const { userInfo, setUserInfo } = useSignUpContext();

  const handleEmail = (text) => {
    setEmail(text);
    setUserInfo({ ...userInfo, email: text });
    setValidInputEle({ ...validInputEle, email: false });
  };

  const goToFindEmail = () => {
    navigation.navigate(AuthRoutes.FindEmailPage);
  };

  useEffect(() => {
    if (email.length > 0) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [email]);

  return (
    <Animated.View
      style={[
        styles.emailVerCon,
        {
          transform: [{ translateX: offsetB }],
        },
      ]}
    >
      <StepTitle title="이메일을 입력해주세요" />

      <EmailInput
        value={email}
        onChangeText={handleEmail}
        validInputEle={validInputEle.email}
        btnUse={false}
      />
      <Pressable onPress={goToFindEmail}>
        <View style={styles.emailReWrap}>
          <Text style={styles.eamilReText}>
            이메일 기억나지 않으세요? 이메일 찾기
          </Text>
          <AntDesign name="right" size={12} color={MEDIUMGRAY} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  emailVerCon: {
    width: "100%",
    position: "absolute",
  },
  emailReWrap: {
    marginTop: 37,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  eamilReText: {
    fontSize: 12,
    color: MEDIUMGRAY,
  },
});

export default EmailVerification;
